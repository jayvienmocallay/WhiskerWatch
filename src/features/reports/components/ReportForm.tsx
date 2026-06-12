import { useRef, useState } from "react";
import type { Condition, ReportLocation } from "../reportTypes";
import { createSubmissionId, validateNewReport } from "../reportValidation";
import { conditionVocabulary } from "../../../ui/statusVocabulary";
import { formCopy } from "../../../ui/copy";
import { ErrorState, SuccessState } from "../../../ui/states";
import {
  AlertEarIcon,
  CameraCatEyeIcon,
  CollarTagIcon,
  FoodBowlIcon,
  HelpedPawIcon,
  PawDropIcon,
  TailSignalIcon,
} from "../../../ui/icons";

interface ReportFormProps {
  selectedLocation?: ReportLocation;
  onSubmitReport: (input: {
    location?: ReportLocation;
    condition?: Condition;
    photoFile?: File;
    notes?: string;
    submissionId: string;
  }) => Promise<void>;
}

const conditions: Condition[] = ["healthy", "injured", "needs_food"];

function conditionIcon(item: Condition) {
  if (item === "needs_food") return <FoodBowlIcon />;
  if (item === "injured") return <AlertEarIcon />;
  return <TailSignalIcon />;
}

export function ReportForm({ selectedLocation, onSubmitReport }: ReportFormProps) {
  const [condition, setCondition] = useState<Condition | undefined>();
  const [photoFile, setPhotoFile] = useState<File | undefined>();
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const submissionIdRef = useRef(createSubmissionId());

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "pending") {
      setErrors({ form: formCopy.duplicatePending });
      return;
    }

    const input = { location: selectedLocation, condition, photoFile, notes, submissionId: submissionIdRef.current };
    const validation = validateNewReport(input);
    setErrors(validation.errors);
    if (!validation.valid) return;

    setStatus("pending");
    try {
      await onSubmitReport(input);
      setStatus("success");
      submissionIdRef.current = createSubmissionId();
      setCondition(undefined);
      setPhotoFile(undefined);
      setNotes("");
      setErrors({});
    } catch (error) {
      const validationErrors = (error as { validationErrors?: Record<string, string> }).validationErrors;
      setErrors(validationErrors ?? { form: (error as Error).message || formCopy.networkFailure });
      setStatus("error");
    }
  }

  return (
    <form className="report-form" aria-label="Create cat report" onSubmit={submit}>
      <h2 className="panel-title"><CollarTagIcon /> Rescue note</h2>
      <div className="location-block">
        <span className="field-label">Selected location</span>
        <p data-testid="selected-location" className="selected-location">
          <PawDropIcon />
          {selectedLocation
            ? `${selectedLocation.latitude.toFixed(3)}, ${selectedLocation.longitude.toFixed(3)} approx.`
            : "Choose a location on the map"}
        </p>
        {errors.location ? <p className="field-error">{errors.location}</p> : null}
      </div>

      <fieldset>
        <legend>Condition</legend>
        <div className="segmented">
          {conditions.map((item) => (
            <label key={item} className={`${conditionVocabulary[item].toneClass} ${condition === item ? "selected" : ""}`}>
              <input
                type="radio"
                name="condition"
                value={item}
                checked={condition === item}
                onChange={() => setCondition(item)}
              />
              <span className="signal-icon" aria-hidden="true">{conditionIcon(item)}</span>
              {conditionVocabulary[item].label}
              <span className="sr-only">{conditionVocabulary[item].cue}</span>
            </label>
          ))}
        </div>
        {errors.condition ? <p className="field-error">{errors.condition}</p> : null}
      </fieldset>

      <label className="file-drop">
        <span><CameraCatEyeIcon /> Photo</span>
        <input
          aria-describedby="photo-help"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(event) => setPhotoFile(event.currentTarget.files?.[0])}
        />
      </label>
      <p id="photo-help" className="hint">
        Optional. JPEG, PNG, or WebP, 5 MB or less.
      </p>
      {errors.photo ? <p className="field-error">{errors.photo}</p> : null}

      <label>
        Notes
        <textarea
          aria-describedby="notes-help"
          value={notes}
          maxLength={500}
          onChange={(event) => setNotes(event.currentTarget.value)}
          placeholder="Cat color, landmark, or safe public context"
        />
      </label>
      <p id="notes-help" className="hint safe-note"><CollarTagIcon /> Safe paws only: {formCopy.safetyGuidance}</p>
      {errors.notes ? <p className="field-error">{errors.notes}</p> : null}

      {errors.form ? <ErrorState message={errors.form} /> : null}
      {status === "success" ? <SuccessState message={formCopy.submitSuccess} /> : null}
      {status === "error" && !errors.form ? <ErrorState message={formCopy.networkFailure} /> : null}

      <button type="submit" disabled={status === "pending"}>
        {status === "pending" ? <><span className="whisker-pending" aria-hidden="true">...</span> Submitting...</> : <><HelpedPawIcon /> Submit report</>}
      </button>
    </form>
  );
}
