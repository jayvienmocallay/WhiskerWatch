# WhiskerWatch Design System

## Design Intent

WhiskerWatch should feel like a neighborhood cat lookout: warm, alert, practical, and unmistakably cat-centered without becoming childish. The interface supports fast rescue-adjacent decisions, so cat personality should live in shape, iconography, labels, marker language, and gentle motion while preserving clear hierarchy, WCAG AA contrast, keyboard access, and calm error handling.

The app already centers on these features:

- Public cat report map
- Map pin location selection
- Cat report submission form
- Condition selection and filtering
- Status filtering
- Visible report list
- Report detail inspection
- Optional photo upload
- Notes with safety/privacy guidance
- Empty, loading, success, and error states

Each feature gets a distinct cat design identity below.

## Brand Personality

- Caring, observant, local, and quick to act.
- Catlike, not cartoonish: use ears, whiskers, paw pads, collars, food bowls, windowsills, and trail marks as subtle UI motifs.
- Friendly but rescue-aware: urgent states should be unmistakable, not cute in a way that downplays risk.
- Community-first: use language that feels like neighbors helping cats, not surveillance.

## Visual Tokens

### Color

Use a multi-tone palette inspired by common cat markings and neighborhood maps.

- `Coal Tabby` `#1F2A24`: primary text and high-contrast UI.
- `Moss Collar` `#256F55`: primary actions and selected controls.
- `Porch Leaf` `#DDEADF`: calm surfaces and secondary buttons.
- `Milk Saucer` `#F8FAF7`: app background.
- `Tuna Gold` `#F2C14E`: food/support states and focus highlights.
- `Ginger Alert` `#E95F45`: injured/urgent states.
- `Tabby Green` `#5DBB78`: healthy/stable states.
- `Night Whisker` `#52655C`: secondary text.
- `Warm Cardboard` `#C98B55`: gentle accent for headings, dividers, and small decorations.
- `Soft Salmon` `#F9D4CD`: urgent surfaces that need lower intensity than red.

Avoid making the whole app green or brown. Green should indicate action and stability; gold and ginger should carry feature-specific meaning.

### Typography

- Primary font: Inter or another highly readable sans-serif.
- Headings: confident, compact, and slightly rounded in feel. Avoid oversized marketing-style headlines inside tool panels.
- Body: concise, direct, and safety-oriented.
- Labels: short, scannable, and action-first.

### Shape

- Base radius: 8px for cards, panels, inputs, buttons, and chips.
- Cat-ear shape may appear on markers, selected tabs, and tiny decorative notches, but not on every container.
- Paw-pad motifs are reserved for progress, loading, empty states, and location selection.
- Whisker lines are reserved for dividers, map overlays, and report detail headers.

### Iconography

Prefer familiar icons plus cat-specific symbols:

- Map pin: cat head silhouette with ears.
- Healthy: upright tail or calm cat face.
- Injured: alert triangle combined with a small ear silhouette.
- Needs food: food bowl or fish-shaped marker.
- Reported: collar tag.
- Monitoring: watchful eye with whisker lines.
- Helped: paw in hand.
- Resolved: checkmark collar tag.
- Closed: quiet moon or tucked tail.

Icons must remain legible at 24-34px and have accessible text equivalents.

## Layout

Keep the current three-zone workbench:

- Left: report creation and filters.
- Center: map and visible reports.
- Right: selected report details.

The layout should feel like a practical dispatch surface, not a landing page. Use full-height map emphasis, dense but breathable controls, and quick scan patterns. On mobile, stack in this order:

1. Map
2. Selected location/report feedback
3. Submit report
4. Filters
5. Report detail

## Feature Cat Identities

### App Shell: Neighborhood Lookout

The app frame should feel like a lookout post from a windowsill.

- Header motif: a slim "windowsill" underline under WhiskerWatch.
- Eyebrow: "Community cat watch" may use a small collar-tag icon.
- Background: off-white with a faint paper-map texture or very subtle paw-trail pattern at low opacity.
- Primary action color: Moss Collar.
- No oversized hero panel; the app itself is the first screen.

### Cat Report Map: The Territory

The map is the main cat territory view.

- Map panel frame: simple 8px radius with a thin border; avoid nesting it in extra cards.
- Selected user location: use a soft paw-print pin or glowing collar ring.
- Report markers: cat-head silhouettes with condition-specific markings.
- Marker selected state: add a whisker-ring outline and raise contrast.
- Popup: compact "cat tag" styling with condition, status, and a clear inspect button.
- Visible map list below: style each item like a small collar tag, with the condition icon first.

### Location Selection: Paw Drop

Dropping a pin should feel like placing a paw mark on the map.

- Empty selected location text: "Choose a location on the map" stays plain and direct.
- After selection: show approximate coordinates in a paw-stamped chip with muted text.
- Add a tiny precision cue such as "approx." using Night Whisker, never exact-address language.
- Focus state: Tuna Gold outline, like a highlighted paw trail.

### Report Form: Rescue Note

The submission form is a quick neighborhood rescue note.

- Panel identity: "clipboard with whiskers" through a small top divider or header accent.
- Inputs: clean, high-contrast, with soft background only on grouped controls.
- Submit button: Moss Collar with a small send/collar-tag icon.
- Pending state: button text remains clear; optional animated whisker sweep can indicate progress.
- Success state: "Report submitted. Helpers can now see it on the map." with a small helped-paw icon.
- Duplicate pending warning: alert tone, not playful.

### Condition Selection: Three Cat Signals

Each condition must have a distinct cat visual language.

- Healthy: Tabby Green, calm upright tail icon, rounded stable chip. Tone: "This cat looks okay but should be noticed."
- Injured: Ginger Alert, alert-ear icon, stronger border, no softening of urgency. Tone: "This needs attention."
- Needs food: Tuna Gold, food bowl icon, warm support chip. Tone: "This cat may need feeding support."

The segmented controls should look like three quick signal badges, not generic pills. Each selected badge gets a small ear notch at the top center.

### Condition Filters: Scent Trail Filters

Condition filters should feel like following different cat trails.

- Use checkbox labels with small trail marks beside each condition.
- Healthy trail: green dot path.
- Injured trail: ginger alert dash path.
- Needs food trail: gold bowl path.
- Selected filters should look active without changing layout size.
- Reset filters button: secondary collar-tag button.

### Status Filters: Watch Stages

Statuses represent the community watch lifecycle.

- Reported: collar tag icon; color neutral-green.
- Monitoring: watchful eye with whiskers; color blue-green accent if introduced.
- Helped: paw in hand; color confident green.
- Resolved: check collar tag; muted but positive.
- Closed: tucked tail or moon; subdued gray-green.

Show statuses as compact watch-stage chips. Active statuses should be clear to color-blind users through icon and border differences, not color alone.

### Visible Report List: Collar Tags

The list under the map is a quick scan of visible cats.

- Each item resembles a small collar tag with a condition symbol and label.
- Selected item: add a double-line collar-ring border.
- Hover/focus: slight lift and Tuna Gold focus outline.
- Keep item height stable so the map panel does not shift.

### Report Detail: Cat Case Card

The detail pane is the selected cat's case card.

- Header: condition chip on the left, status chip on the right, separated by subtle whisker divider lines.
- Photo: rounded 8px, object-fit cover, no heavy frame. Add a tiny "reported photo" caption only if useful.
- Details: use definition-list rhythm with small collar-tag labels for location, submitted time, and notes.
- Empty detail state: show a quiet windowsill or collar-tag motif with "Select a report marker to inspect details."

### Photo Upload: Snapshot Patch

Photo upload should feel like attaching a small evidence snapshot.

- File input area: simple bordered drop zone with a camera/cat-eye icon.
- Accepted file guidance remains visible and concise.
- Validation error uses Ginger Alert and avoids whimsical phrasing.
- If preview is added later, show it as a "snapshot patch" with 8px radius and clear remove control.

### Notes and Safety Copy: Gentle Boundary

Safety guidance should feel protective and firm.

- Use a soft "safe paws only" visual treatment: muted warning surface, small shield/collar icon.
- Keep copy direct: no phone numbers, emails, exact home addresses, or unsafe rescue instructions.
- Do not hide safety copy behind a tooltip; it is core to community safety.
- Error state should point to the specific unsafe note problem.

### Empty State: Quiet Windowsill

Empty states should suggest "no cats spotted here yet" without implying failure.

- Visual: windowsill line, small paw trail fading out, or empty collar tag.
- Tone: calm and actionable.
- For filter empty state, reset button remains visually secondary.
- Avoid large illustrations that compete with the map.

### Loading State: Whisker Sweep

Loading should be subtle and map-friendly.

- Use a small whisker-line shimmer or three paw dots.
- Text remains plain: "Loading community reports..."
- Keep the map area reserved so layout does not jump.

### Error State: Alert Ear

Errors should be clear and serious.

- Use Ginger Alert text/border with a small alert-ear icon.
- Do not use playful cat language for failures involving saving, validation, or unsafe content.
- Provide recovery action when possible.

### Success State: Help Signal

Success should feel like the community has been notified.

- Use Tabby Green with a helped-paw or collar-tag check icon.
- Keep the message concise.
- Do not auto-hide before screen-reader users can perceive it.

## Component Rules

- Buttons: use icons when the action is familiar; text plus icon for primary submit/reset actions.
- Chips: condition and status chips must include label, icon, and non-color selected state.
- Cards: only for form, filters, detail, and state containers. Do not place cards inside cards.
- Inputs: maintain stable height and clear focus outlines.
- Map markers: never rely on color alone; use distinct silhouettes or symbols.
- Text: keep labels short and avoid decorative copy where speed matters.
- Motion: small and purposeful; respect reduced-motion settings.

## Accessibility

- All markers need accessible names matching condition and status.
- All icon-only controls need visible labels or accessible labels.
- Contrast must meet WCAG AA for text and meaningful UI states.
- Keyboard users must be able to tab through report creation, filters, visible reports, and details.
- Focus outline uses Tuna Gold and must be visible on map controls, chips, inputs, and buttons.
- Do not encode urgency with cuteness; urgent reports must remain urgent.

## Responsive Behavior

- Desktop: three-column workbench with center map dominant.
- Tablet: map first, form/filter and detail side by side when width allows.
- Mobile: single-column workflow with sticky or near-top map context if practical.
- All chips and report list items must wrap cleanly with stable spacing.
- Map height should remain useful on mobile without hiding the report workflow.

## Copy Voice

Use calm, direct, cat-aware language.

- Good: "Report submitted. Helpers can now see it on the map."
- Good: "Choose a location on the map."
- Good: "Needs food"
- Avoid: jokes during errors, overly cute rescue language, or anything that suggests unsafe intervention.

## Future Design Opportunities

- Replace letter markers with cat-condition icons.
- Add a tiny selected-location paw pin.
- Add cat-tag styled filter chips.
- Add report photo preview with clear remove action.
- Add a low-opacity paw-trail background texture.
- Add a "nearby reports" count with a collar-tag motif.

