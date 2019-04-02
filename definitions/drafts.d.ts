/**
 * In addition to being able to lookup an action using the find method, a single global action object is created and available in scripts to inquire about the current action and control flow.
 *
 * https://reference.getdrafts.com/objects/Action.html
 */
declare class Action {
  /**
   * Search for action matching the name passed and return it if found
   * @param name name to search for
   */
  static find(name: string): string | undefined

  /**
   * The name of the action.
   */
  name: string
}
declare const action: Action

/**
 * Represents an action group. Can be used to inquire and load action groups in the action list and extended keyboard using methods on the App object.
 *
 * https://reference.getdrafts.com/objects/Action.html
 */
declare class ActionGroup {
  /**
   * Get list of all available action groups.
   */
  static getAll(): ActionGroup[]

  /**
   * Search for action group matching the name passed and return it if found. Returns undefined if not found.
   * @param name The name of the action group.
   */
  static find(name: string): ActionGroup | undefined

  /**
   * The name of the action group.
   */
  name: string
}
declare const actionGroup: ActionGroup

/**
 * Alarms are alerts which can be attached to Reminder and Event objects.
 *
 * https://reference.getdrafts.com/objects/Alarm.html
 */
declare class Alarm {
  /**
   * Alarm set to remind at a specific date/time.
   * @param date TODO: probably a unix timestamp? Myabe a date object
   */
  static alarmWithDate(date: number): Alarm

  /**
   * Alarm set to remind at a specific number of seconds relative to the start date of the event. Note that alarms created with this methods are only supported on calendar events, not reminders.
   * @param seconds seconds from now
   */
  static alarmWithOffset(seconds: number): Alarm
}

/**
 * Drafts defines a single global “app” object which provides access to application level functions.
 *
 * https://reference.getdrafts.com/objects/App.html
 */
declare class App {
  /**
   * Version number of current installation of Drafts.
   */
  readonly version: string

  /**
   * Get or set themeMode.
   */
  themeMode: 'light' | 'dark' | 'automatic'

  /**
   * Returns the active theme mode, light or dark, taking into account automatic switching of themes if active. If writing scripts to branch logic based on the current mode, this is the best property to use.
   */
  readonly currentThemeMode: 'light' | 'dark'

  /**
   * Is the draft list side panel is visible.
   */
  readonly isDraftListVisible: boolean

  /**
   * Is the action list side panel is visible.
   */
  readonly isActionListVisible: boolean

  /**
   * Is system sleep timer disabled preventing screen dimming/sleep. FIX: readonly?
   */
  isIdleDisabled: boolean

  /**
   * opens URL passed using iOS. Returns true if URL was opened, false if the URL was invalid or no available app can open the URL on the device.
   * @param url url to open
   * @param useSafari whether to use the Safari View Controller (true) or Safari app (false). FIX: test this
   */
  openURL(url: string, useSafari?: boolean): boolean

  /**
   * Queues an action to run on a draft after the current action is complete.
   * @param action Actions can be obtained using the `Action.find()` method.
   * @param draft A draft object
   */
  queueAction(action: Action, draft: Draft): boolean

  /**
   * Open draft selection interface and wait for user to select a draft. Returns the select draft object, or undefined if user cancelled.
   */
  selectDraft(): Draft | undefined

  // UI FUNCTIONS

  /**
   * Open draft list side bar.
   */
  showDraftList(): void

  /**
   * Close draft list side bar.
   */
  hideDraftList(): void

  /**
   * Open action list side bar.
   */
  showActionList(): void

  /**
   * Close action list side bar.
   */
  hideActionList(): void

  /**
   * Apply the Workspace as if it was selected in draft list.
   **/
  applyWorkspace(workspace: Workspace): boolean

  /**
   * Load the ActionGroup in the action list side bar.
   */
  loadActionGroup(actionGroup: ActionGroup): boolean

  /**
   * Load the ActionGroup in the extended keyboard row.
   */
  loadKeyboardActionGroup(actionGroup: ActionGroup): boolean

  /**
   * Enable and disable the iOS system sleep timer to prevent screen dimming/sleep.
   */
  setIdleDisabled(isDisabled: boolean): void

  // CLIPBOARD FUNCTIONS
  /**
   * Get current contents of the system clipboard.
   */
  getClipboard(): string

  /**
   * Set the contents of the system clipboard.
   * @param string the data to set
   */
  setClipboard(contents: string): void

  /**
   * Takes HTML string and converts it to rich-text and places it in the system clipboard. Returns true if successful, false if an error occurred in conversion.
   * @param html a possibly-valid html string
   */
  htmlToClipboard(html: string): boolean

  // MESSAGES FUNCTIONS
  /**
   * Show success banner notification with the message passed.
   */
  displaySuccessMessage(message: string): void
  /**
   * Show info banner notification with the message passed.
   */
  displayInfoMessage(message: string): void
  /**
   * Show warning banner notification with the message passed.
   */
  displayWarningMessage(message: string): void
  /**
   * Show error banner notification with the message passed.
   */
  displayErrorMessage(message: string): void
}
declare const app: App

/**
 * The Draft object represents a single draft. When an action is run, the current draft is available as the global variable “draft”. Scripts can also create new drafts, access and set values, and update the draft to persist changes.
 *
 * https://reference.getdrafts.com/objects/Draft.html
 */
declare class Draft {}

/**
 * Represents a Workspace. Can be used to inquire and load workspaces and apply them using methods on the App object.
 *
 * https://reference.getdrafts.com/objects/Workspace.html
 */
declare class Workspace {}
