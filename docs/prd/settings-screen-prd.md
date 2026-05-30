# PRD: Settings Screen

## 1. Screen Overview

The Settings screen lives at `/settings` inside the Studio OS app shell (sidebar + header). It is a single-page settings hub where the current user manages their personal profile, account security, visual preferences, notification behavior, and display configuration. All five sections are accessible via a persistent left-side nav that swaps the right-hand content area without any page navigation — a tab pattern managed with local React state. The screen replaces the current partial implementation in `app/settings/page.tsx` and is fully client-side with static mock data in v1.

---

## 2. User Goals

- Update personal profile information (name, email, role/title, bio, avatar).
- Change account password securely.
- Switch between light and dark mode, or follow system preference.
- Control which notifications they receive and how.
- Configure display preferences (language, timezone, date format).

---

## 3. Business Goals

- Give users a clear, trustworthy place to manage their identity within the studio workspace.
- Reduce friction for onboarding new team members who need to complete their profile.
- Establish the Settings screen as the authoritative control panel for personal preferences, consistent with the Studio OS visual language.

---

## 4. Primary Users

| Role | Context | Frequency |
|---|---|---|
| Studio member | Completing or updating their profile after onboarding | Occasionally (1–2x per month) |
| Studio lead / owner | Changing notification preferences or appearance | Occasionally |
| Any user | Changing password after a security prompt | Rarely, but high priority when needed |

---

## 5. Main Use Cases

**UC-01 — Edit profile**
Trigger: User navigates to Settings (defaults to Profile tab).
Action: User edits name, email, role/title, bio, and/or avatar. Clicks "Save Changes".
Outcome: Form shows a success state. Data is updated in mock state.

**UC-02 — Cancel profile edit**
Trigger: User has made edits but decides not to save.
Action: Clicks "Cancel".
Outcome: Form fields reset to their previous values.

**UC-03 — Change password**
Trigger: User clicks "Account" in the left nav.
Action: User fills in current password, new password, confirm new password. Clicks "Update Password".
Outcome: Inline success or error feedback. Fields clear on success.

**UC-04 — Change theme**
Trigger: User clicks "Appearance" in the left nav.
Action: User selects Light, Dark, or System from a segmented control.
Outcome: Theme applies immediately. Selection persists in localStorage.

**UC-05 — Toggle notifications**
Trigger: User clicks "Notifications" in the left nav.
Action: User toggles on/off switches for each notification type.
Outcome: Switches update immediately. State persists in mock data.

**UC-06 — Update display preferences**
Trigger: User clicks "Display" in the left nav.
Action: User selects language, timezone, and date format from Select dropdowns.
Outcome: Selections update mock state. A "Save" button confirms changes.

---

## 6. Functional Requirements

**FR-01** — The left nav renders 5 items: Profile, Account, Appearance, Notifications, Display. Exactly one is active at a time.

**FR-02** — Clicking a nav item swaps the right content panel without any page navigation or URL change.

**FR-03** — The active nav item is visually distinguished (`bg-accent text-accent-foreground`).

**FR-04 — Profile section:**
- Displays avatar (upload trigger), name, email, role/title, and bio fields.
- "Save Changes" button submits the form; "Cancel" resets fields to initial values.
- Avatar area shows current avatar image or initials fallback; clicking it opens a file-picker trigger (no actual upload in v1 — shows a disabled state or "Coming soon" tooltip).

**FR-05 — Account section:**
- Displays three password fields: Current Password, New Password, Confirm New Password.
- "Update Password" button is disabled until all three fields are non-empty.
- Shows inline validation: new password ≥ 8 characters; confirm must match new.
- On success: fields clear and a success message appears inline.
- On error: error message appears inline without clearing fields.

**FR-06 — Appearance section:**
- Theme selector with three options: Light, Dark, System. Rendered as a segmented Button group.
- Selecting an option applies the theme immediately (toggles `.dark` on `<html>`, same mechanism as `Header`'s ThemeToggle).
- No save button needed — applies on selection.

**FR-07 — Notifications section:**
- Renders a list of notification toggles, each with a label, description, and a Switch primitive.
- Notification types: Email Digest, Project Updates, Task Assignments, Team Mentions, Billing Alerts.
- Each switch fires an immediate local state update. No save button — applies on toggle.

**FR-08 — Display section:**
- Three Select dropdowns: Language (English only in v1, others disabled), Timezone, Date Format.
- A "Save Preferences" button at the bottom applies the selection to mock state.
- Timezone list: a reasonable subset (~20 common zones).
- Date format options: MM/DD/YYYY, DD/MM/YYYY, YYYY-MM-DD.

**FR-09** — The screen header always shows "Settings" as the page title (`text-2xl font-bold`) regardless of active section.

**FR-10** — Each content panel starts with a section title and subtitle using the same pattern as the existing Profile panel (`text-xl font-semibold` + `text-sm text-muted-foreground`), followed by a `<Separator />`.

---

## 7. Content Requirements

### Profile fields
| Field | Type | Default value | Constraint |
|---|---|---|---|
| Avatar | Image / initials fallback | User initials | File picker disabled in v1 |
| Name | Text input | "Alex Johnson" | Max 60 chars |
| Email | Email input | "alex@studio-os.com" | Valid email format |
| Role / Title | Text input | "Product Designer" | Max 80 chars |
| Bio | Textarea (3 rows) | "Design lead at Studio OS." | Max 200 chars |

### Account fields
| Field | Type | Constraint |
|---|---|---|
| Current Password | Password input | Required |
| New Password | Password input | Min 8 chars |
| Confirm New Password | Password input | Must match New Password |

### Appearance options
- Theme: Light · Dark · System (default: follows current app theme)

### Notification toggles
| Label | Description | Default |
|---|---|---|
| Email Digest | Receive a weekly summary of studio activity | On |
| Project Updates | Notify me when a project status changes | On |
| Task Assignments | Notify me when I'm assigned to a task | On |
| Team Mentions | Notify me when someone mentions me | On |
| Billing Alerts | Notify me about invoices and payment issues | Off |

### Display preferences
| Field | Options | Default |
|---|---|---|
| Language | English (US) | English (US) |
| Timezone | ~20 common zones | UTC |
| Date Format | MM/DD/YYYY · DD/MM/YYYY · YYYY-MM-DD | MM/DD/YYYY |

---

## 8. UX Requirements

- **No page navigation.** Section switching is purely state-driven (`activeSection` state in `SettingsPage`).
- **Left nav is always visible** regardless of active section.
- **Feedback is inline**, not in a toast or modal. Success/error messages appear directly under the submit button.
- **Cancel resets to initial values**, not to empty. Use `defaultValues` pattern — keep a `savedProfile` ref alongside `draftProfile` state.
- **Password fields never pre-fill.** Always start empty.
- **Theme change is instant** — no delay, no save button. Same mechanism used by `Header`'s `ThemeToggle`.
- **Notification switches are instant** — no save button.
- **Display section requires explicit save** because timezone/date-format changes have wider impact and should not apply mid-edit.
- All interactive elements must have visible focus rings (`focus-visible:ring-ring/50`).
- On narrow viewports (`< md`), the left nav collapses above the content area (stacked layout).

---

## 9. UI Requirements

- **Page layout:** Matches existing `app/settings/page.tsx` structure — `space-y-6` wrapper, `text-2xl font-bold` page title, then a `flex gap-8` two-column layout.
- **Left nav width:** `w-44 shrink-0`. Nav items: `h-8 px-2 rounded-md text-sm font-medium`, active state `bg-accent text-accent-foreground`, hover `hover:bg-accent/60`.
- **Right content area:** `flex-1`, section title `text-xl font-semibold`, subtitle `text-sm text-muted-foreground`, then `<Separator />`, then the form body.
- **Form inputs:** Use `<Input />` from `components/ui/input`. Width `w-[280px]` for single-line fields. Textarea: `<textarea>` styled with `border-input bg-background` classes (no `Textarea` primitive exists yet — use `Input`-consistent styling directly).
- **Buttons:** `<Button variant="default" size="sm">Save Changes</Button>` + `<Button variant="outline" size="sm">Cancel</Button>` side by side in a `flex gap-2` row.
- **Switch:** Use Radix `Switch` primitive from `radix-ui` (already available via shadcn). Style consistent with the rest of the form.
- **Appearance segmented control:** Three `<Button>` components in a `flex` row with `rounded-lg` container, `variant="ghost"` for inactive, `variant="secondary"` for active.
- **Avatar area:** Use `<Avatar size="lg">` from `components/ui/avatar`. Wrap in a relative container with a camera-icon overlay button (`size-6`, `bg-muted`, `rounded-full`, `absolute bottom-0 right-0`).
- **Responsive:** At `< md`, the `flex gap-8` layout stacks to `flex-col`. Left nav becomes a horizontal scroll row of buttons at the top.

---

## 10. Components Needed

### Existing — reuse
| Component | Location | Used for |
|---|---|---|
| `Input` | `components/ui/input` | All text/email/password fields |
| `Button` | `components/ui/button` | Save, Cancel, Update Password, theme selector |
| `Separator` | `components/ui/separator` | Section divider below title |
| `Avatar`, `AvatarImage`, `AvatarFallback` | `components/ui/avatar` | Profile avatar display |
| `Tooltip`, `TooltipTrigger`, `TooltipContent` | `components/ui/tooltip` | "Avatar upload coming soon" |
| `Select`, `SelectTrigger`, `SelectContent`, `SelectItem` | `components/ui/select` | Language, Timezone, Date Format |
| `cn` | `@/lib/utils` | All className composition |

### New — build
| Component | File | Description |
|---|---|---|
| `SettingsNav` | inline in `app/settings/page.tsx` | Left nav item list, driven by `activeSection` state |
| `ProfileSection` | `components/settings/profile-section.tsx` | Profile form with avatar, fields, Save/Cancel |
| `AccountSection` | `components/settings/account-section.tsx` | Password change form with validation |
| `AppearanceSection` | `components/settings/appearance-section.tsx` | Theme segmented control, wires to existing theme mechanism |
| `NotificationsSection` | `components/settings/notifications-section.tsx` | List of Switch toggles |
| `DisplaySection` | `components/settings/display-section.tsx` | Language/timezone/date-format selects + Save |
| `SettingsSectionShell` | `components/settings/settings-section-shell.tsx` | Shared wrapper: title + subtitle + Separator + content slot |
| `types.ts` | `components/settings/types.ts` | `SettingsSection`, `NotificationPrefs`, `DisplayPrefs`, `UserProfile` |
| `data.ts` | `components/settings/data.ts` | Mock user profile, default notification prefs, timezone list |

---

## 11. States

### Profile section
| State | Behavior |
|---|---|
| Default | Fields pre-filled with mock user data |
| Dirty (edited) | Save + Cancel become enabled |
| Saving | Save button shows loading indicator (disabled, spinner icon) |
| Success | Inline green success message: "Profile updated." Disappears after 3s |
| Error | Inline red error message: "Failed to save. Please try again." |
| Avatar upload (v1) | Tooltip: "Avatar upload coming in a future update." Camera button is visible but disabled |

### Account section
| State | Behavior |
|---|---|
| Default | All three fields empty, Update Password button disabled |
| Validating | Inline error if new < 8 chars or confirm ≠ new |
| Success | Fields clear, green inline message: "Password updated." |
| Error | Red inline message: "Current password is incorrect." |

### Appearance section
| State | Behavior |
|---|---|
| Default | Active option matches current theme |
| Selecting | Theme applies immediately on click |

### Notifications section
| State | Behavior |
|---|---|
| Default | Switches in their default on/off states |
| Toggling | Immediate local state update |

### Display section
| State | Behavior |
|---|---|
| Default | Dropdowns show current saved preferences |
| Dirty | Save button becomes active |
| Success | Inline message: "Preferences saved." |

---

## 12. Edge Cases

- **Long name / bio:** Name >60 chars truncates gracefully. Bio >200 shows character counter approaching limit (`text-xs text-muted-foreground` counter below the field).
- **Invalid email:** Show inline validation on blur, not on keystroke. Message: "Please enter a valid email address."
- **Password mismatch:** Show inline error only after the user touches the confirm field. Don't validate on first keystroke.
- **All notifications off:** No empty state needed — the list always renders all 5 items. No warning shown.
- **Language dropdown (v1):** Only English is enabled. All others render as `SelectItem` with `disabled` prop and a `text-muted-foreground` style.
- **Theme sync:** Appearance section must read the current theme from `localStorage` on mount so the correct option is highlighted on first render.
- **Cancel with no changes:** Cancel button does nothing visible (no diff to reset) — still renders, does not need to be disabled.
- **Narrow viewport:** Left nav stacks above content. Nav items in a horizontal scrollable row (`flex overflow-x-auto gap-1 pb-2`).

---

## 13. Success Criteria

1. All 5 nav sections render with real, non-placeholder content.
2. Clicking a nav item swaps the right content area with zero page navigation or URL change.
3. Profile form: Save persists changes to local state; Cancel reverts all fields to their last saved values.
4. Account form: Update Password button is disabled until all three fields are filled; inline validation fires on blur.
5. Appearance section: Selecting a theme option applies the `.dark` class toggle immediately, consistent with the existing `Header` ThemeToggle.
6. The screen is visually consistent with Projects and Tasks: same card/form spacing, same typography scale, same button variants, same separator usage.

---

## 14. Implementation Notes

- **Routing:** No change needed. The screen stays at `app/settings/page.tsx`. All section switching is internal state: `const [activeSection, setActiveSection] = useState<SettingsSection>("profile")`.
- **Theme integration:** `AppearanceSection` should read/write `localStorage` key `"theme"` and dispatch a `"theme-change"` DOM event (or call the same helper used by `Header`'s ThemeToggle) so the `<html>` class updates globally.
- **Types (`components/settings/types.ts`):**
  ```ts
  export type SettingsSection = "profile" | "account" | "appearance" | "notifications" | "display"

  export interface UserProfile {
    name: string
    email: string
    role: string
    bio: string
    avatarUrl?: string
    initials: string
  }

  export interface NotificationPrefs {
    emailDigest: boolean
    projectUpdates: boolean
    taskAssignments: boolean
    teamMentions: boolean
    billingAlerts: boolean
  }

  export interface DisplayPrefs {
    language: string
    timezone: string
    dateFormat: "MM/DD/YYYY" | "DD/MM/YYYY" | "YYYY-MM-DD"
  }
  ```
- **Mock data (`components/settings/data.ts`):** Seed with realistic values matching the Team page member "Alex Johnson" for consistency.
- **Switch primitive:** Import as `import { Switch as SwitchPrimitive } from "radix-ui"`. Style with `data-[state=checked]:bg-primary` and a knob via `::before` or a child `<span>`. Alternatively, add `components/ui/switch.tsx` as a proper shadcn primitive first if it doesn't exist.
- **No Storybook, no new token.** No new OKLCH variables. No raw hex values anywhere.
- **Static export safe:** No `useSearchParams`, no server components, no route handlers.
