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
  readonly name: string
}
declare const action: Action

/**
 * Represents an action group. Can be used to inquire and load action groups in the action list and extended keyboard using methods on the App object.
 *
 * https://reference.getdrafts.com/objects/ActionGroup.html
 */
declare class ActionGroup {
  /**
   * Get list of all available action groups.
   */
  static getAll(): ActionGroup[]

  /**
   * Search for action group matching the name passed and return it if found. Returns `undefined` if not found.
   * @param name The name of the action group.
   */
  static find(name: string): ActionGroup | undefined

  /**
   * The name of the action group.
   */
  readonly name: string
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
   * @param date FIXME: probably a unix timestamp? Myabe a date object
   */
  static alarmWithDate(date: number): Alarm

  /**
   * Alarm set to remind at a specific number of seconds relative to the start date of the event. Note that alarms created with this methods are only supported on calendar events, not reminders.
   * @param seconds seconds from now
   */
  static alarmWithOffset(seconds: number): Alarm
}

/**
 * Drafts defines a single global "app" object which provides access to application level functions.
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
   * Is system sleep timer disabled preventing screen dimming/sleep. FIXME: readonly?
   */
  isIdleDisabled: boolean

  /**
   * opens URL passed using iOS. Returns true if URL was opened, false if the URL was invalid or no available app can open the URL on the device.
   * @param url url to open
   * @param useSafari whether to use the Safari View Controller (true) or Safari app (false). FIXME: test this
   */
  openURL(url: string, useSafari?: boolean): boolean

  /**
   * Queues an action to run on a draft after the current action is complete.
   * @param action Actions can be obtained using the `Action.find()` method.
   * @param draft A draft object
   */
  queueAction(action: Action, draft: Draft): boolean

  /**
   * Open draft selection interface and wait for user to select a draft. Returns the select draft object, or `undefined` if user cancelled.
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
 * Helper methods to encode and decode [Base64](https://en.wikipedia.org/wiki/Base64) strings.
 *
 * https://reference.getdrafts.com/objects/Base64.html
 */
declare class Base64 {
  /**
   * Base64 encode a string.
   * @param data the string to encode
   */
  static encode(data: string): string

  /**
   * Base64 decode a string.
   * @param data the string to decode
   */
  static decode(data: string): string
}

/**
 * Box objects can be used to work with files in a Box.com account.
 *
 * https://reference.getdrafts.com/objects/Box.html
 */
declare class Box {
  readonly lastError?: string

  /**
   * Reads the contents of the file at the path as a string. Returns `undefined` value if the file does not exist or could not be read. Paths should begin with a `/` and be relative to the root directory of your Box.com account.
   * @param path
   */
  read(path: string): string

  /**
   * Write the contents of the file at the path. Returns true if successful, false if the file could not be written successfully. This will override existing files!
   * @param path Paths should begin with a `/` and be relative to the root directory of your Box
   * @param content Text to place in the file.
   * @param overwrite If false, an existing file will not be overwritten.
   */
  write(path: string, content: string, overwrite?: boolean): boolean

  /**
   * Creates a new Box object. Identifier is a optional string value used to identify a Box.com account. Typically this can be omitted if you only work with one Box.com account in Drafts.
   */
  static create(identifier?: string): Box
}
declare const box: Box

/**
 * Calendar objects are used to manipulate and create calendars in the built-in Calendars app and its associated accounts.
 *
 * https://reference.getdrafts.com/objects/Calendar.html
 */
declare class Calendar {
  title: string
  /**
   * A Boolean value that indicates whether you can add, edit, and delete items in the calendar.
   */
  allowsContentModificationx: boolean
  /**
   * A Boolean value indicating whether the calendar’s properties can be edited or deleted.
   */
  isImmutable: boolean

  /**
   * Save changes to the calendar.
   */
  update(): boolean

  /**
   * Create a new Event object in this calendar.
   */
  createEvent(): Event

  /**
   * Returns array of events on the calendar between the start and end dates specified.
   */
  events(startDate: Date, endDate: Date): Event[]

  /**
   * Searches for a calendar matching the title. If none is found, creates a new list with that title in your default calendars account. If more than one calendar with the same name exist in Calendars, the first found will be returned.
   */
  static findOrCreate(title: string): Calendar

  /**
   * Searches for a calendar matching the title. If none is found, return `undefined`.
   */
  static find(title: string): Calendar | undefined

  /**
   * Get an array all known calendars on the device.
   */
  static getAllCalendars(): Calendar[]

  /**
   * Returns the system default calendar configured for new events.
   */
  static default(): Calendar
}

/**
 * CallbackURL objects can be used to open x-callback-url requests and wait for a response from the target app.
 * **NOTE**: If you want to open a URL in Safari or another app and do not need a response or x-callback-url support, use the `app.openURL(url)` method on the App object.
 *
 * https://reference.getdrafts.com/objects/CallbackURL.html
 */
declare class CallbackURL {
  /**
   * The baseURL of the request. This should include the x-callback-url base URL and action, typically something like `app-scheme://x-callback-url/actionName`
   */
  baseURL: string

  /**
   * If true, the script will pause and wait for the `x-success`, `x-error` or `x-cancel` response from the app being targeted by the URL. If false, execution of the script/action will continue immediately and no response/results will be available.
   */
  waitForResponse: boolean

  /**
   * Object containing string keys and values to be appended to the base url as query parameters. Values should not be pre-encoded, but will be encoded and added to the base URL automatically. Do not include x-callback parameters (`x-success`, `x-error`, `x-cancel`) as these will be generated by Drafts.
   */
  parameters: { [x: string]: any }

  /**
   * The current status of the callback. Used to check outcome after open is called. Possible values:
   * * created: open has not yet been called.
   * * success: x-success callback was received from target app.
   * * cancelled: x-cancel callback was received from target app.
   * * error: x-error callback was received from target app.
   * * timeout: Waiting for the response timed out without receiving a callback URL from the target app.
   * * invalid: The URL was invalid and could not be opened.
   */
  status: 'created' | 'success' | 'cancelled' | 'error' | 'timeout' | 'invalid'

  /**
   * An object contain and URL query parameters returned by the target app along with it’s callback response. For example, if the target app called x-success with the query parameters `result=MyTestText`, callbackResponse would contain `{"result": "MyTestText"}`.
   */
  callbackResponse: { [x: string]: any }

  /**
   * Opens the URL with associated parameters, and waits for a callback response. Returns true if an x-success response was received from the target app, otherwise false. If false, use the "status" property to determine the type of failure.
   */
  open(): boolean

  /**
   * Add a query parameter for the outgoing URL.
   * FIXME: can the value be anything?
   */
  addParameter(key: string, value: any): void

  /**
   * Creates a new CallbackURL object.
   */
  static create(): CallbackURL
}

/**
 * A single global "context" object is available to scripts to control flow of the currently running action.
 *
 * It is important to understand that `cancel()` and `fail()` will not immediately stop script, just stop any further action steps from being performed.
 *
 * https://reference.getdrafts.com/objects/Context.html
 */
declare class Context {
  /**
   * If [Callback URL]() or [Run Workflow]() action steps using the "Wait for response" option have been run in steps before the script step in an action, and the target app returned to Drafts using an x-success callback, this object will contain an array of objects with the parsed query parameters included in those responses, in the order they were received. FIXME: links here
   */
  callbackResponses: { [x: string]: any }

  /**
   * Tell the context to cancel the action at the end of the script execution. If called, at the end of the script the action will be stopped. No subsequent action steps in the action will run, and the action still stop silently - no notification banners, sounds, etc. If a message is included it will be added to the action log to explain the cancellation.
   */
  cancel(message: string): void

  /**
   * Tell the context to fail the current action. In effect this is the same as `cancel()` but an error notification will be shown. If a message is included it will be added to the action log to explain the cancellation.
   */
  fail(message: string): void
}
declare const context: Context

/**
 * Credential objects can be used in actions which require the user to provide a username, password and optionally a host name, to connect to a service. By using credentials objects, actions can be written to connect to arbitrary web services without hard coding credentials into the action.
 *
 * When an authorize() call is made on a credential object for the first time, the user is prompted to enter their credentials, then Drafts stores those for later use. When the action is used again, there will be no prompt required and the stored credentials will be used.
 *
 * Credentials objects have unique identifiers, and a single set of user credentials can be used across actions by using the same identifier.
 *
 * The user can delete those credentials at any time by visiting Settings > Credentials and tapping the "Forget" button on a service.
 *
 * Drafts Reference
 */
declare class Credential {
  /**
   * Create a credential object with the specified identifier and description. Identifiers should be unique, such that any two calls from different actions with the same identifier will return the same credentials
   */
  static create(identifier: string, description: string): Credential

  /**
   * Create credential already configured with username and password fields.
   */
  static createWithUsernamePassword(
    identifier: string,
    description: string
  ): Credential

  /**
   * Create credential already configured with host url, username and password fields.
   */
  static createWithHostUsernamePassword(
    identifier: string,
    description: string
  ): Credential

  /**
   * Call this function after configuring, but before using host, username or password properties of a credential. If the credential object has not be previous authorized, the user will be prompted to enter their credentials before continuing. If the user has previously been prompt, this method will load previously provided information.
   */
  authorize(): boolean

  /**
   * Get the value the user stored for the key, as defined in a call to add the field.
   */
  getValue(key: string): string

  /**
   * Add a text field for data entry.
   * @param key used to retrieve the value
   * @param label label is displayed to the user
   */
  addTextField(key: string, label: string): void

  /**
   * Add a secure entry text field for data entry.
   * @param key used to retrieve the value
   * @param label label is displayed to the user
   */
  addPasswordField(key: string, label: string): void

  /**
   * Add a text field for configured for URL data entry.
   * @param key used to retrieve the value
   * @param label label is displayed to the user
   */
  addURLField(key: string, label: string): void

  /**
   * Deletes the credentials provided by the user. This is the same as the user visiting settings and tapping "Forget" for the credentials.
   */
  forget(): void
}

/**
 * Drafts defines a single global "device" object which provides access to information about the current device.
 *
 * https://reference.getdrafts.com/objects/Device.html
 */
declare class Device {
  /**
   * Model of current device.
   */
  model: 'iPhone' | 'iPad' | 'Mac' // FIXME: capitalization on mac

  /**
   * Name of current OS.
   */
  systemName: 'iOS' | 'macOS'

  /**
   * Version of current OS.
   */
  systemVersion: string

  /**
   * Current battery level as a number between 0.0 and 1.0
   */
  batteryLevel: number
}
declare const device: Device

/**
 * The Draft object represents a single draft. When an action is run, the current draft is available as the global variable "draft". Scripts can also create new drafts, access and set values, and update the draft to persist changes.
 *
 * https://reference.getdrafts.com/objects/Draft.html
 */
declare class Draft {
  /**
   * Unique identifier for the draft.
   */
  readonly uuid: string
  content: string

  /**
   * The title. This is generally the first line of the draft.
   */
  readonly title: string

  /**
   * The preferred language grammar (syntax) to use for the draft.
   */
  languageGrammar:
    | 'Plain Text'
    | 'Markdown'
    | 'Taskpaper'
    | 'JavaScript'
    | 'Simple List'
    | 'MultiMarkdown'
    | 'GitHub Markdown'

  /**
   * The index location in the string of the beginning of the last text selection.
   */
  readonly selectionStart: number

  /**
   * The length of the last text selection.
   */
  readonly selectionLength: number

  /**
   * Array of string tag names assigned to the draft.
   */
  readonly tags: string[]

  /**
   * True if draft is in the archive, false if it is in inbox.
   */
  isArchived: boolean

  /**
   * True if draft is in the trash, false if it is not.
   */
  isTrashed: boolean

  /**
   * Use to access or set flagged status.
   */
  isFlagged: boolean

  readonly createdAt: Date
  createdLongitude: number
  createdLatitude: number
  readonly modifiedAt: Date
  modifiedLongitude: number
  modifiedLatitude: number

  /**
   * URL which can be used to open the draft.
   */
  readonly permalink: string

  /**
   * Save changes made to the draft to the database. _This must be called to save changes made during an action’s execution._
   */
  update(): void

  addTag(tag: string): void

  /**
   * remove a tag if it is assigned to the draft.
   */
  removeTag(tag: string): void

  /**
   * returns boolean indicating whether the tag is currently assigned to the draft.
   */
  hasTag(tag: string): boolean

  /**
   * runs the passed template string through the template engine to evaluate tags (like `[[title]]`, `[[body]]`).
   */
  processTemplate(template: string): string

  /**
   * set a custom tag value for use in templates. For example, calling `setTemplateTag("mytag", "mytext")` will create a tag `[[mytag]]`, which subsequent action step templates can use.
   */
  setTemplateTag(tagName: string, value: string): void

  /**
   * get the current value of a custom template tag.
   */
  getTemplateTag(tagName: string): string

  /**
   * create a new draft object. This is an in-memory object only, unless "update()" is called to save the draft.
   */
  create(): Draft

  /**
   * find an existing draft based on UUID.
   */
  find(uuid: string): Draft

  /**
   * perform a search for drafts and return an array of matching draft objects.
   * @param queryString Search string, as you would type in the search box in the draft list. Will find only drafts with a matching string in their contents. Use empty string (`""`) not to filter.
   * @param filter Filter by one of the allowed values
   * @param tags Results will only include drafts with one or more of these tags assigned.
   * @param omitTags Results will omit drafts with any of these tags assigned.
   * @param sort
   * @param sortDescending If `true`, sort descending. Defaults to `false`.
   * @param sortFlaggedToTop If `true`, sort flagged drafts to beginning. Defaults to `false`.
   */
  query(
    queryString: string,
    filter: 'inbox' | 'archive' | 'flagged' | 'trash' | 'all',
    tags: string[],
    omitTags: string[],
    sort: 'created' | 'modified' | 'accessed',
    sortDescending: boolean,
    sortFlaggedToTop: boolean
  ): Draft[]

  /**
   * Returns array of recently used tags. Helpful for building prompts to select tags.
   */
  recentTags(): string[]
}
declare const draft: Draft

/**
 * Event object represent individual calendar events.
 *
 * https://reference.getdrafts.com/objects/Event.html
 */
declare class Event {
  /**
   * The calendar which this event resides in.
   */
  calendar: Calendar

  /**
   * The title of the event.
   */
  title: string

  /**
   * Notes associated with the event.
   */
  notes: string

  /**
   * Start date of the event.
   */
  startDate: Date

  /**
   * End date of the event.
   */
  endDate: Date

  /**
   * Flag for all day events.
   */
  isAllDay: boolean

  /**
   * Location of the event.
   */
  location: string

  /**
   * Original creation date of the event.
   */
  readonly creationDate: Date

  /**
   * Last change to the event.
   */
  readonly lastModifiedDate: Date

  /**
   * Returns true if the event has any alarms.
   */
  readonly hasAlarms: boolean

  /**
   * The alarms assigned to the event, if any.
   */
  alarms: Alarm[]

  /**
   * If a function fails, this property will contain the last error as a string message, otherwise it will be `undefined`.
   */
  lastError: string | undefined

  /**
   * Save the event. Returns true if the event is successfully saved in Calendars.
   */
  update(): boolean

  /**
   * Open the event in the system event editing card. The user will be able to modify/edit the event values and add to a calendar from this view. Returns true if the event was saved, false if the user canceled or deleted the event.
   */
  edit(): boolean

  /**
   * Add an alarm object to the event. Be sure to `update()` to save after adding alarms.
   */
  addAlarm(alarm: Alarm): void

  /**
   * Remove any assigned alarms from the event.
   */
  removeAllAlarms(): void
}

/**
 * FileManager objects can be used to read from or write to files in either the local Drafts app Documents directory (as visible in the `Files.app`), or iCloud Drive (inside the `Drafts5` folder).
 *
 * https://reference.getdrafts.com/objects/FileManager.html
 */
declare class FileManager {
  /**
   * If a function fails, this property will contain the last error as a string message, otherwise it will be `undefined`.
   */
  lastError: string | undefined

  /**
   * Convenience method to create local file manager.
   */
  createLocal(): FileManager

  /**
   * Convenience method to create iCloud file manager.
   */
  createCloud(): FileManager

  /**
   * Reads the contents of the file at the path. Returns `undefined` value if the file does not exist or could not be read.
   * @param path should begin with a `/` and be relative to the root directory of the FileManager.
   */
  readString(path: string): string | undefined

  /**
   * Write the contents of the file at the path. Returns true if successful, false if the file could not be written successfully. This will override existing files!
   */
  writeString(path: string, content: string): boolean

  /**
   * List files and directories at the specified path. Array of full path will be returned.
   */
  listContents(path: string): string[]

  /**
   * Create a directory with the specified name in the specified path. Returns true if directory successfully created.
   */
  createDirectory(name: string, path: string): boolean

  /**
   * Move file or directory at `fromPath` to the `toPath`. From and to path should be complete paths with file names included.
   * @param fromPath
   * @param toPath
   * @param overwrite If true, replace existing files in at the toPath. If false, abort operation if file exists at destination.
   */
  moveItem(fromPath: string, toPath: string, overwrite?: boolean): boolean

  /**
   * Copy file or directory at `fromPath` to the `toPath`. From and to path should be complete paths with file names included.
   * @param fromPath
   * @param toPath
   * @param overwrite If true, replace existing files in at the toPath. If false, abort operation if file exists at destination.
   */
  copyItem(fromPath: string, toPath: string, overwrite?: boolean): boolean

  /**
   * Creates a new FileManager object.
   * @param isLocal If `true`, the `FileManager` will be using the to the local Drafts app documents directory as its root directory, as it appears in the "On my …" area in the `Files.app`. If `false`, it will use the Drafts5 iCloud folder as its root directory.
   */
  static create(isLocal: boolean): FileManager
}

/**
 * Drafts includes Discount-based, GitHub flavored Markdown parser based on [GHMarkdownParser](https://github.com/OliverLetterer/GHMarkdownParser). For details on the meaning of the various options, refer to [Markdown documentation](https://getdrafts.com/settings/markdown).
 *
 * https://reference.getdrafts.com/objects/GitHubMarkdown.html
 */
declare class GitHubMarkdown {
  /**
   * Takes Markdown string passed and processes it with GitHub Markdown parser based on the property selections on the object.
   */
  render(markdownStr: string): string

  /**
   * defaults to true
   */
  smartQuotesEnabled: boolean
  /**
   * defaults to true
   */
  noImages: boolean
  /**
   * defaults to true
   */
  noLinks: boolean
  /**
   * defaults to true
   */
  safeLinks: boolean
  /**
   * defaults to false
   */
  autoLinks: boolean
  /**
   * defaults to false
   */
  strict: boolean
  /**
   * defaults to false
   */
  removeHTMLTags: boolean

  /**
   * create a new object.
   */
  static create(): GitHubMarkdown
}

// GLOBAL FUNCTIONS
// https://reference.getdrafts.com/objects/Global.html

/**
 * Shows a simple alert dialog containing the message.
 */
declare function alert(message: string): void

/**
 * Include the contents of a script loaded from iCloud Drive. The contents of the script will be evaluated as if they were inline with the current script. Useful for loading reusable libraries and utility scripts.
 * @param path  relative path to javascript file in the iCloud Drive `/Drafts/Library/Scripts` folder. For example, to load the script in the file `test.js` in the `iCloud Drive/Drafts/Library/Scripts/Utilities/` folder, use the path parameter `Utilities/test.js`.
 */
declare function require(path: string): void

/**
 * Format date using strftime format string. See [strftime format reference](https://developer.apple.com/library/archive/documentation/System/Conceptual/ManPages_iPhoneOS/man3/strftime.3.html) for supported format strings.
 */
declare function strftime(date: Date, format: string): string

/**
 * The GmailMessage object can be used to create and send mail messages through Gmail accounts, similar to those created by a [Gmail action step](https://getdrafts.com/actions/steps/gmail). Creating and sending these messages happens in the background, with no user interface, so messages must be complete with recipients before calling send(). Sending is done via the [Gmail API](https://developers.google.com/gmail/api/). Gmail accounts are authenticated when used for the first time using OAuth - to use more than one account, call create with different identifier parameters.
 *
 * https://reference.getdrafts.com/objects/GmailMessage.html
 */
declare class GmailMessage {
  /**
   * Array of email addresses to use as `To:` recipients. Each entry can be a valid email address, or a name and email in the format `Name<email>`.
   */
  toRecipients: string[]
  /**
   * Array of email addresses to use as `CC:` recipients. Each entry can be a valid email address, or a name and email in the format `Name<email>`.
   */
  ccRecipients: string[]
  /**
   * Array of email addresses to use as `BCC:` recipients. Each entry can be a valid email address, or a name and email in the format `Name<email>`.
   */
  bccRecipients: string[]

  subject: string

  /**
   * Body text of the mail message. Can be plain text or HTML if the `isBodyHTML` property is set to `true`.
   */
  body: string

  /**
   * whether to treat the body string and plain text or HTML. When set to `true`, the `body` property should be set to full valid HTML.
   */
  isBodyHTML: boolean

  /**
   * Send the mail message via the Gmail API.
   */
  send(): boolean

  /**
   * create a new object.
   * @param identifier notes which for Gmail account to use. This string is an arbitrary value, but we recommend using the email address you wish to associate with the script. Each unique identifier will be associated with its own [Credential](https://getdrafts.com/settings/credentials).
   */
  static create(identifier?: string): GmailMessage
}

/**
 * GoogleDrive objects can be used to work with files in Google Drive accounts.
 *
 * https://reference.getdrafts.com/objects/GoogleDrive.html
 */
declare class GoogleDrive {
  /**
   * If a function fails, this property will contain the last error as a string message, otherwise it will be `undefined`.
   */
  lastError: string | undefined

  /**
   * Reads the contents of the file at the with the file name, in the parent folder, as a string. Returns `undefined` value if the file does not exist or could not be read.
   * @param fileName
   * @param parent Name of folder in the root of the Google Drive, or `""` for root. FIXME: optional?
   */
  read(fileName: string, parent: string): string | undefined

  /**
   * Write the contents of the file at the path. Returns true if successful, false if the file could not be written successfully. This will override existing files!
   * @param fileName
   * @param parent Name of folder in the root of the Google Drive, or `""` for root.
   * @param content Text to write to file.
   */
  write(fileName: string, parent: string, content: string): boolean

  /**
   * Creates a new GoogleDrive object.
   * @param identifier used to identify a GoogleDrive account. Typically this can be omitted if you only work with one GoogleDrive account in Drafts.
   */
  static create(identifier?: string): GoogleDrive
}

/**
 * Display of HTML Preview window, the same as the HTMLPreview action step. Returns true if user closed preview with the "Continue" button, false if the user cancelled.
 *
 * https://reference.getdrafts.com/objects/HTMLPreview.html
 */
declare class HTMLPreview {
  /**
   * Open HTML Preview window displaying the HTML string passed.
   * @param html The HTML content to display. Should be complete HTML document.
   */
  show(html: string): boolean

  static create(): HTMLPreview
}

/**
 * The HTTP and HTTPResponse objects are used to run synchronous HTTP requests to communicate with APIs, or just read pages from the web. A full set of custom settings can be passed, and all HTTP methods (GET, POST, PUT, DELETE, etc.) are supported.
 *
 * https://reference.getdrafts.com/objects/HTTP.html
 */
declare class HTTP {
  /**
   * @param settings an object with the following properties:
   * * url [string, required]: The HTTP URL to make the request.
   * * method [string, required]: The HTTP method, like "GET", "POST", etc.
   * * headers [object, optional]: An object contain key-values to be added as custom headers in the request.
   * * parameters [object, optional]: Query parameters to merge with the url. Query parameters can also be part of the original url value.
   * * data [object, optional]: An object containing data to be encoded into the HTTP body of the request.
   * * encoding [string, optional]: Possible values:
   * * json: Default. Encode data using JSON in request body.
   * * form: Use traditional application/x-www-form-urlencoded parameter encoding for request body.
   * * username [string, optional]: A username to encode for Basic Authentication.
   * * password [string, optional]: A password to encode for Basic Authentication.
   */
  request(settings: {
    url: string
    method: string
    headers?: { [x: string]: string }
    parameters?: { [x: string]: string }
    data?: { [x: string]: string }
    encoding?: 'json' | 'form'
    username?: string
    password?: string
  }): HTTPResponse

  static create(): HTTP
}

/**
 * HTTPResponse objects are returned by calls to HTTP methods.
 *
 * https://reference.getdrafts.com/objects/HTTPResponse.html
 */
declare class HTTPResponse {
  /**
   * true/false for whether the request was completed successfully.
   */
  success: boolean

  /**
   * The HTTP status code (like 200, 301, etc.) returned.
   */
  statusCode: number

  /**
   * The raw data returned. Typically an object or array of objects, but exact content varies by server response.
   */
  responseData: any

  /**
   * The data returned as a string format.
   */
  responseText: string

  /**
   * Some responses return additional data that is placed in this field.
   */
  otherData: string | undefined

  /**
   * If an error occurred, a description of the type of error.
   */
  error: string | undefined
}

/**
 * The Mail object can be used to create and send mail messages, similar to those created by a "Mail" action step.
 *
 * https://reference.getdrafts.com/objects/Mail.html
 */
declare class Mail {
  /**
   * Array of email addresses to use as `To:` recipients.
   */
  toRecipients: string[]

  /**
   * Array of email addresses to use as `CC:` recipients.
   */
  ccRecipients: string[]

  /**
   * Array of email addresses to use as `BCC:` recipients.
   */
  bccRecipients: string[]

  /**
   * Subject line
   */
  subject: string

  /**
   * Body text of the mail message. Can be plain text or HTML if the `isBodyHTML` property is set to `true`.
   */
  body: string

  /**
   * whether to treat the body string and plain text or HTML. When set to `true`, the `body` property should be set to full valid HTML.
   */
  isBodyHTML: boolean

  /**
   * If `true`, the mail will be sent in the background using a web service rather than via Mail.app - but will come from `drafts5@drafts5.agiletortoise.com`. Defaults to `false`.
   */
  sendInBackground: boolean

  /**
   * indicates if the message object has already been sent.
   */
  isSent: boolean

  /**
   * One of the following values:
   * * created: Initial value before `send()` has been called.
   * * sent: The message was sent successfully.
   * * savedAsDraft: On iOS, the user exited the Mail.app window saving as draft, but not sending.
   * * mailUnavailable: On iOS, Mail.app services were not available.
   * * userCancelled: The user cancelled the Mail.app window without sending.
   * * invalid: Mail object is invalid. Common cause if of this is sendInBackground being true, but no recipient configured.
   * * serviceError: Background mail service returned an error.
   * * unknownError: An unknown error occurred.
   */
  status:
    | 'created'
    | 'sent'
    | 'savedAsDraft'
    | 'mailUnavailable'
    | 'userCancelled'
    | 'invalid'
    | 'serviceError'
    | 'unknownError'

  /**
   * Send the mail message. This will open the `Mail.app` sending window. Returns `true` if the message was sent successfully or `false` if not - if, for example, the user cancelled the mail window.
   */
  send(): boolean

  static create(): Mail
}

/**
 * The Message object can be used to create and send mail iMessages, similar to those created by a "Message" action step.
 *
 * https://reference.getdrafts.com/objects/Message.html
 */
declare class Message {
  /**
   * Array of phone numbers and email addresses to use as `To:` recipients.
   */
  toRecipients: string[]
  /**
   * Subject line. Only used if subject is enabled in Messages settings on the device.
   */
  subject: string
  /**
   * Body text of the mail message.
   */
  body: string
  /**
   * true/false flag indicated if the message object has already been sent.
   */
  isSent: boolean

  /**
   * One of the following strings
   * * created: Initial value before `send()` has been called.
   * * sent: The message was sent successfully.
   * * messagesUnavailable: On iOS, Mail.app services were not available.
   * * userCancelled: The user cancelled the Mail.app window without sending.
   * * unknownError: An unknown error occurred.
   */
  status:
    | 'created'
    | 'sent'
    | 'messagesUnavailable'
    | 'userCancelled'
    | 'unknownError'

  /**
   * Send the message. This will open the `Messages.app` sending window. Returns `true` if the message was sent successfully or `false` if not - if, for example, the user cancelled the message window.
   */
  send(): boolean

  static create(): Message
}

/**
 * Drafts includes a full version of the MultiMarkdown 6 engine to render Markdown text to HTML and other supported formats. For details on the meaning of the various options, refer to [MultiMarkdown documentation](https://github.com/fletcher/MultiMarkdown-6).
 *
 * https://reference.getdrafts.com/objects/MultiMarkdown.html
 */
declare class MultiMarkdown {
  /**
   * Takes Markdown string passed and processes it with MultiMarkdown based on the properties and format selections on the object.
   */
  render(markdownStr: string): string

  /**
   * Specify output format. Valid values are:
   * * `html`: HTML. This is the default Markdown output.
   * * `epub`: ePub
   * * `latex`: LaTeX
   * * `beamer`
   * * `memoir`
   * * `odt`: Open document format
   * * `mmd`
   */
  format: 'html' | 'epub' | 'latex' | 'beamer' | 'memoir' | 'odt' | 'mmd'

  /**
   * defaults to `false`
   */
  markdownCompatibilityMode: boolean
  /**
   * defaults to `false`
   */
  completeDocument: boolean
  /**
   * defaults to `false`
   */
  snippetOnly: boolean
  /**
   * defaults to `true`
   */
  smartQuotesEnabled: boolean
  /**
   * defaults to `true`
   */
  footnotesEnabled: boolean
  /**
   * defaults to `true`
   */
  noLabels: boolean
  /**
   * defaults to `true`
   */
  processHTML: boolean
  /**
   * defaults to `false`
   */
  noMetadata: boolean
  /**
   * defaults to `false`
   */
  obfuscate: boolean
  /**
   * defaults to `false`
   */
  criticMarkup: boolean
  /**
   * defaults to `false`
   */
  criticMarkupAccept: boolean
  /**
   * defaults to `false`
   */
  criticMarkupReject: boolean
  /**
   * defaults to `false`
   */
  randomFootnotes: boolean
  /**
   * defaults to `false`
   */
  transclude: boolean

  static create(): MultiMarkdown
}

/**
 * The MustacheTemplate object support rendering of templates using the [Mustache](https://en.wikipedia.org/wiki/Mustache_%28template_system%29) template style.
 *
 * Mustache templates offer advanced features for iterating over items, creating conditional blocks of text and more. This is still a bit of an experimental feature, please send feedback if you are finding edge cases or are interested in more functionality in this area.
 *
 * The object can be used in one of two ways, by passing a specific template as a string and rendering it, or by passing a path to a subdirectory of the `iCloud Drive/Drafts/Library/Templates` folder which can contain more than one Mustache style templates (with file extension `.mustache`), and then rendering them. The late method has the advantage of supporting the use of partial templates in the same folder.
 *
 * For details on using Mustache templates, we recommend reviewing [tutorials](https://www.bersling.com/2017/09/22/the-ultimate-mustache-tutorial/).
 *
 * ### About Passing Data to Templates
 *
 * When rendering Mustache templates, you pass the template itself and a data object which contains the values available to insert. The data object should be a Javascript object with keys and values. Values can be basic data types (numbers, strings, dates) and also arrays or nested objects which can be iterated using conventions of the Mustache syntax.
 *
 * https://reference.getdrafts.com/objects/MustacheTemplate.html
 */
declare class MustacheTemplate {
  /**
   * Use in combination with `createWithTemplate(template)` to render the template using the data passsed.
   * @param data A Javascript object with the values to use when rendering the template. The object can have nested sub-objects.
   */
  render(data: { [x: string]: any }): string

  /**
   * Use in combination with `createWithPath(path)` to render the template using the data passsed.
   * @param templateName The name of a template file in the directory passed to create the MustacheTemplate object. Do not include the ".mustache" file extension. For example, if you have a "Document.mustache" file in the directory, pass templateName "Document".
   * @param data  A Javascript object with the values to use when rendering the template. The object can have nested sub-objects.
   */
  renderTemplate(templateName: string, data: any): string

  /**
   * Determines how the Mustache engine renders output. Valid options:
   * * `text`: Render the output as plain text, do not do additional encoding of entities.
   * * `html`: Render output as escaped HTML with entities converted for use in HTML.
   */
  contentType: 'text' | 'html'

  /**
   * Create a new object with a template
   * @param template a valid Mustache template string
   */
  createWithTemplate(template: string): MustacheTemplate

  /**
   * Create a new object configured to point to a directory of Mustache template files in iCloud Drive. When using this method, other Mustache template located in the same directory will be available to be used as partials in the rendering process.
   * @param path Relative path to a directory of Mustache template files (with .mustache file extension) located in `iCloud Drive/Drafts/Library/Templates`. For example to refer to templates in the directory `iCloud Drive/Drafts/Library/Templates/My Mustache Templates/`, pass `My Mustache Templates/` to this method.
   */
  createWithPath(path: string): MustacheTemplate
}

/**
 * OneDrive objects can be used to work with files in a OneDrive account.
 *
 * https://reference.getdrafts.com/objects/OneDrive.html
 */
declare class OneDrive {
  /**
   * If a function fails, this property will contain the last error as a string message, otherwise it will be undefined.
   */
  lastError: string | undefined

  /**
   * Reads the contents of the file at the path as a string. Returns undefined value if the file does not exist or could not be read. Paths should begin with a `/` and be relative to the root directory of your OneDrive.
   */
  read(path: string): string

  /**
   * Write the contents of the file at the path. Returns true if successful, false if the file could not be written successfully. This will override existing files!
   * @param path Paths should begin with a `/` and be relative to the root directory of your OneDrive
   * @param content Text to place in the file
   * @param overwrite If `false`, an existing file will not be overwritten
   */
  write(path: string, content: string, overwrite?: boolean): boolean

  /**
   *
   * @param identifier Optional identifier for OneDrive account to use. This string is an arbitrary value, but we recommend using the email address you wish to associate with the script. Each unique identifier will be associated with its own [Credential](https://getdrafts.com/settings/credentials).
   */
  static create(identifier?: string): OneDrive
}

/**
 * The OutlookMessage object can be used to create and send mail messages through Outlook.com integrated accounts, similar to those created by a [Outlook action step](https://getdrafts.com/actions/steps/outlook). Creating and sending these messages happens in the background, with no user interface, so messages must be complete with recipients before calling `send()`. Sending is done via the [Microsoft Graph API](https://developer.microsoft.com/en-us/graph). Outlooks accounts are authenticated when used for the first time using OAuth - to use more than one account, call create with different identifier parameters.
 *
 * https://reference.getdrafts.com/objects/OutlookMessage.html
 */
declare class OutlookMessage {
  /**
   * Array of email addresses to use as `To:` recipients. Each entry can be a valid email address, or a name and email in the format `Name<email>`.
   */
  toRecipients: string[]
  /**
   * Array of email addresses to use as `CC:` recipients. Each entry can be a valid email address, or a name and email in the format `Name<email>`.
   */
  ccRecipients: string[]
  /**
   * Array of email addresses to use as `BCC:` recipients. Each entry can be a valid email address, or a name and email in the format `Name<email>`.
   */
  bccRecipients: string[]

  subject: string

  /**
   * Body text of the mail message. Can be plain text or HTML if the `isBodyHTML` property is set to `true`.
   */
  body: string

  /**
   * whether to treat the body string and plain text or HTML. When set to `true`, the `body` property should be set to full valid HTML.
   */
  isBodyHTML: boolean

  /**
   * Send the mail message via the Microsoft Graph API.
   */
  send(): boolean

  /**
   * create a new object.
   * @param identifier notes which for Outlook account to use. This string is an arbitrary value, but we recommend using the email address you wish to associate with the script. Each unique identifier will be associated with its own [Credential](https://getdrafts.com/settings/credentials).
   */
  static create(identifier?: string): OutlookMessage
}

type keyboardTypes =
  | 'default'
  | 'numbersAndPunctuation'
  | 'numberPad'
  | 'phonePad'
  | 'namePhonePad'
  | 'emailAddress'
  | 'decimalPad'
  | 'webSearch'
  | 'URL'

type capitalizationTypes = 'none' | 'sentences' | 'words'

/**
 * Prompts allow the creation and display of custom dialogs.
 *
 * https://reference.getdrafts.com/objects/Prompt.html
 */
declare class Prompt {
  title: string

  /**
   * A longer message explaining the purpose of the dialog, if needed.
   */
  message: string

  /**
   * If true, a "Cancel" button will be included in the dialog. Defaults to `true`. If the user selects the cancel button, the `show()` method will return `false`. If `false`, no cancel button will be displayed and the user must select one of the button name options.
   */
  isCancellable: boolean

  /**
   * After the `show()` method is called, this property will contain values from any fields added to the prompt. The dictionary keys will be the names of the fields as passed in when they were created, and the value will be the current contents of that field. They type of data depends on the type of field.
   */
  fieldValues: { [x: string]: any }

  /**
   * After the `show()` method is called, this property will contain the name of the button selected by the user.
   */
  buttonPressed: string

  /**
   * Add an information text label to the prompt.
   * @param name Identifier for the field.
   * @param label The text of the label.
   * @param options A dictionary of options for configuring the text field.
   */
  addLabel(
    name: string,
    label: string,
    options?: { textSize?: 'body' | 'caption' | 'headline' } // FIXME: is this actually optional? and the rest of these
  ): void

  /**
   * Add a text input field to the prompt
   * @param name Identifier for the field. This will be used as the key in the `fieldValues` dictionary to access the contents of the field after calling `show()`.
   * @param label User-friendly text label to place next to the field.
   * @param initialText The initial text contents for the field.
   * @param options A dictionary of options for configuring the text field. See [the site](https://reference.getdrafts.com/objects/Prompt.html) for full descriptions of the options.
   */
  addTextField(
    name: string,
    label: string,
    initialText: string, // FIXME: is this optional?
    options?: {
      placeholder?: string
      autocorrect?: boolean
      autocapitalization?: capitalizationTypes
      keyboard?: keyboardTypes
      wantsFocus?: boolean
    }
  ): void

  /**
   * Add a text input field to the prompt
   * @param name Identifier for the field. This will be used as the key in the `fieldValues` dictionary to access the contents of the field after calling `show()`.
   * @param label User-friendly text label to place next to the field.
   * @param initialText The initial text contents for the field.
   * @param options A dictionary of options for configuring the text field. See [the site](https://reference.getdrafts.com/objects/Prompt.html) for full descriptions of the options.
   */
  addTextView(
    name: string,
    label: string,
    initialText: string,
    options?: {
      height?: number
      autocorrect?: boolean
      autocapitalization?: capitalizationTypes
      keyboard?: keyboardTypes
      wantsFocus?: boolean
    }
  ): void

  /**
   * Same as addTextField, but the input field will be password masked.
   */
  addPasswordField(name: string, label: string, initialValue: string): void

  /**
   * Add an on/off toggle switch. The `fieldValues` entry for this item will be a boolean indicating whether the switch was on.
   * @param name Identifier for the field. This will be used as the key in the `fieldValues` dictionary to access the contents of the field after calling `show()`.
   * @param label User-friendly text label to place next to the field.
   * @param initialValue indicate if the switch should be on or off when initially displayed.
   */
  addSwitch(name: string, label: string, initialValue: boolean): void

  /**
   * Add a date and/or time picker to the prompt, with the arguments as below. The `fieldValues` entry for this will be a date object.
   * @param name Identifier for the field. This will be used as the key in the `fieldValues` dictionary to access the contents of the field after calling `show()`.
   * @param label User-friendly text label to place next to the field.
   * @param initialDate The initial date to selected for the field. Minimum and maximum values should be defined in options.
   * @param options A dictionary of options for configuring the text field. See [the site](https://reference.getdrafts.com/objects/Prompt.html) for full descriptions of the options.
   */
  addDatePicker(
    name: string,
    label: string,
    initialDate: Date,
    options?: {
      mode?: 'date' | 'time' | 'dateAndTime'
      minimumDate?: Date
      maximumDate?: Date
      minuteInterval?: number
    }
  ): void

  /**
   * Add a picker to the prompt, with the arguments as below. Picker can contain multiple rows. The `fieldValues` entry for this will be a array of selected index values object.
   * @param name Identifier for the field. This will be used as the key in the `fieldValues` dictionary to access the contents of the field after calling `show()`.
   * @param label User-friendly text label to place next to the field.
   * @param columns The values to display in the picker. Should be an array containing arrays of string values, each sub-array representing a column in the picker. Example two column picker: `[["Item 1", "Item 2"],["Column 2 Item 1", "Column 2 Item 2"]]`
   * @param selectedRows Array of zero-based index values to set the initial selected row in each column.
   */
  addPicker(
    name: string,
    label: string,
    columns: string[][],
    selectedRows: number[]
  ): void

  /**
   * Add a select control. Returns an array of string values in `fieldValues`.
   * @param name Identifier for the field. This will be used as the key in the `fieldValues` dictionary to access the contents of the field after calling `show()`.
   * @param label User-friendly text label to place next to the field.
   * @param values The array of string values that will be available to select.
   * @param selectedValues Array of string values that should be initially selected when the prompt is displayed. All values in this array should match values in the `values` array.
   * @param allowMultiple If `false`, selecting a value will deselect all other values. If `true`, the user may select multiple items.
   */
  addSelect(
    name: string,
    label: string,
    values: string[],
    selectedValues: string[],
    allowMultiple: boolean
  ): void

  /**
   * Add a button to the array of buttons to be displayed. All buttons should be created before calling `show()`.
   * @param name
   * @param value only needed to associate a different value than will be displayed in the button. For example, if you call `prompt.addButton("First Button", 1)`, after calling `prompt.show()` if that button is pressed, the `prompt.buttonPressed` will contain the number value `1`.
   * @param isDefault used to specify a single button which will be pinned to the bottom of the prompt and respond to `cmd + return` as the default button. If only one button is added to a prompt, it is assumed to be the default.
   */
  addButton(name: string, value?: string, isDefault?: boolean): void

  /**
   * Displays the prompt. Returns `true` if the user selected one of the buttons in the buttons array, `false` if the user selected the "Cancel" button. After the dialog has been shown, the `buttonPressed` property will contain the name of the button selected by the user.
   */
  show(): boolean

  static create(): Prompt
}

/**
 * Reminder objects represent individual tasks in a list in the built-in Reminders app.
 *
 * https://reference.getdrafts.com/objects/Reminder.html
 */
declare class Reminder {
  /**
   * The list which this task resides in.
   */
  list: ReminderList
  title: string
  notes: string
  dueDate?: Date

  /**
   * Integer number representing priority. Assign values matching those Apple uses as follows:
   * * `0`: No priority
   * * `1`: High
   * * `5`: Medium
   * * `9`: Low
   */
  priority: 0 | 1 | 5 | 9

  /**
   * Flag indicating if the task has been completed.
   */
  isCompleted: boolean

  /**
   * Returns true if the reminder has any alarms.
   */
  readonly hasAlarms: boolean

  /**
   * The alarms assigned to the reminder, if any.
   */
  alarms: Alarm[]

  /**
   * Save the task. Returns true if the task is successfully saved in Reminders.
   */
  update(): boolean

  /**
   * Add an alarm object to the reminder. Be sure to `update()` to save after adding alarms. Return `true` if the alarm was successfully added. Note that reminders only support alarms created with the `Alarm.alarmWithDate` method.
   */
  addAlarm(alarm: Alarm): boolean

  /**
   * Remove any assigned alarms from the reminder.
   */
  removeAlarms(): void
}

/**
 * ReminderList objects are used to manipulate and create lists in the built-in Reminders app.
 *
 * https://reference.getdrafts.com/objects/ReminderList.html
 */
declare class ReminderList {
  /**
   * The name of the list.
   */
  title: string
  /**
   * All reminders in the list.
   */
  readonly tasks: Reminder[]
  /**
   * Reminders in the list which are NOT completed.
   */
  readonly incompleteTasks: Reminder[]
  /**
   * Reminders in the list which have been marked completed.
   */
  readonly completeTasks: Reminder[]

  /**
   * Save changes to the list.
   */
  update(): boolean

  /**
   * Create a new Reminder object in this list
   */
  createReminder(): Reminder

  /**
   * Searches for a list in the reminders app matching the title. If none is found, creates a new list with that title. If more than one list with the same name exist in Reminders, the first found will be returned.
   */
  static findOrCreate(title: string): ReminderList

  /**
   * Searches for a reminder lists matching the title. If none is found, return undefined.
   */
  static find(title: string): ReminderList

  /**
   * Get an array all known reminder lists on the device.
   */
  static getAllReminderLists(): ReminderList[]

  /**
   * Returns the system default reminder list configured for new reminders.
   */
  static default(): ReminderList
}

/**
 * Methods to share via system share sheet.
 *
 * https://reference.getdrafts.com/objects/Share.html
 */
declare class Share {
  /**
   * Open system share sheet to share the string provided as text. Returns `true` if share was completed by user, `false` if input was invalid or user cancelled the share.
   */
  static shareAsText(text: string): boolean

  /**
   * Open system share sheet to share the url provided as a URL object. Returns `true` if share was completed by user and `false` if input was invalid or user cancelled share.
   * @param url should be a complete and valid URL
   */
  static shareAsURL(url: string): boolean

  /**
   * Open system share sheet to share the content as a file, with the specified file name (with e). Returns `true` if share was completed by user amd `false` if input was invalid or user cancelled share. Drafts will create a temporary file for the purposes of the share and send it to the share sheet. The temporary file will be deleted after. Useful, for example, to create a text file and share to Mail, and it will be shared as an attachment to the email
   */
  static shareAsFile(filename: string, text: string): boolean
}

/**
 * [Things](https://culturedcode.com/things/) is a popular task and project management app from Cultured Code. Things supports advanced URL schemes (required Things v3.4 or greater on iOS) which can accept multiple todos, projects, headings in a single call to the app. The scripting interfaces below are convenience wrappers that allow easy creation and encoding of the URLs needed to pass this type of information to Things.
 *
 * The Javascript objects are wrappers around an [open source Swift library](https://github.com/culturedcode/ThingsJSONCoder) provided by Cultured Code, with a few modifications to work in Javascript. In all cases, nothing is committed to Things until the the items are wrapped in a TJSContainer, and the URL it generates called to send the data to Things. This is best done with Drafts’ `CallbackURL` object (see example below).
 *
 * For more information about what values Things understands in these objects, refer to [their URL scheme documenation](https://support.culturedcode.com/customer/en/portal/articles/2803573).
 *
 * https://reference.getdrafts.com/objects/Things.html
 */

/**
 * Wraps an array of todo and/or project items and encodes them into a URL for use to send the request to Things. See [Things](https://reference.getdrafts.com/objects/Things.html)
 */
declare class TJSContainer {
  static create(items: Array<TJSProject | TJSTodo>): TJSContainer

  url: string
}

/**
 * Represents a Things project, with headings and todo items. See [Things](https://reference.getdrafts.com/objects/Things.html)
 */
declare class TJSProject {
  static create(): TJSProject

  title: string
  notes: string
  when: string
  deadline: string
  areaID: string
  area: string
  completed: boolean
  canceled: boolean
  tags: string[]

  addTag(tag: string): void
  addTodo(todo: TJSTodo): void
  addHeading(heading: TJSHeading): void
}

/**
 * Represents a Things heading within a project. See [Things](https://reference.getdrafts.com/objects/Things.html)
 */
declare class TJSHeading {
  static create(): TJSHeading

  title: string
  archived: boolean
}

/**
 * Represents a Things todo item. Todos can be added a project or directly to a container. See [Things](https://reference.getdrafts.com/objects/Things.html)
 */
declare class TJSTodo {
  static create(): TJSTodo

  title: string
  notes: string
  when: string
  deadline: string
  listID: string
  list: string
  tags: string[]
  heading: string
  completed: boolean
  canceled: boolean

  addChecklistItem(item: TJSChecklistItem): void
  addTag(tag: string): void
}

/**
 * Represents a Things check list item, which can be added to a Todo. See [Things](https://reference.getdrafts.com/objects/Things.html)
 */
declare class TJSChecklistItem {
  static create(): TJSChecklistItem

  title: string
  completed: boolean
  canceled: boolean
}

/**
 * Script integration with [Todoist](http://todoist.com/). This object handles OAuth authentication and request signing. The entire [Todoist REST API](https://developer.todoist.com/rest/v8) can be used with the request method, and convenience methods are provided for common API endpoints to manage tasks, projects, comments and labels.
 *
 * The `quickAdd` method is mostly likely what you are looking for to create tasks as it supports the shorthand the task entry box in Todoist supports to parse projects, etc.
 *
 * Other methods are direct mappings of the REST API calls provided by Todoist. Most take an `options` parameter which is a javascript object containing the parameters to be passed to the API, and and the method decodes the JSON response from Todoist and returns it as a Javascript object (or array of objects) with the values as specified in the Todoist API docs.
 *
 * If an API calls fails, typically the result will be an `undefined` value, and the `lastError` property will contains error detail information for troubleshooting.
 *
 * https://reference.getdrafts.com/objects/Todoist.html
 */
declare class Todoist {
  /**
   * If a function success, this property will contain the last response returned by Todoist. The JSON returned by Todoist will be parsed to an object and placed in this property. Refer to [Todoist API documentation](https://developer.todoist.com/rest/v8) for details on the contents of this object based on call made.
   */
  lastResponse: any

  /**
   * If a function fails, this property will contain the last error as a string message, otherwise it will be `undefined`.
   */
  lastError?: string

  /**
   * @param text Text to use to create the task. Supports Todoist quick add notation for specifying projects, priority, labels, etc. just as if you were using the Todoist quick add window.
   * @param note Optional text to attach as a comment with the task.
   * @param reminder Optional natural language date specifying for creating a task reminder.
   */
  quickAdd(text: string, note?: string, reminder?: string): object

  // TASKS
  getTasks(options?: object): object[]
  createTask(options: object): object
  getTask(taskId: string): object
  updateTask(taskId: string, options: object): object

  /**
   * Close task (mark complete)
   */
  closeTask(taskId: string): boolean

  /**
   * Reopen task (mark incomplete)
   */
  reopenTask(taskId: string): boolean

  // PROJECTS
  getProjects(): object[]
  createProject(options: object): object
  getProject(projectId: string): object
  updateProject(projectId: string, options: object): object

  // COMMENTS
  getComments(options: object): object[]
  createComment(options: object): object
  getComment(commentId: string): object
  updateComment(commentId: string, options: object): object

  // LABELS
  getLabels(): object[]
  createLabel(options: object): object
  getLabel(labelId: string): object
  updateLabel(labelId: string, options: object): object

  // FUNCTIONS

  /**
   * Execute a request against the Todoist API. For successful requests, the HTTPResponse object will contain an object or array or objects decoded from the JSON returned by Todoist as appropriate to the request made. Refer to Todoist’s API documentation for details about the expected parameters and responses. Drafts will handle wrapping the request in the appropriate OAuth authentication flow.
   * @param settings an object with the following properties:
   * * url [string, required]: The full URL to the endpoint in the [Todoist REST API](http://doist.github.io/todoist-api/rest/v8/#overview).
   * * method [string, required]: The HTTP method, like "GET", "POST", etc.
   * * headers [object, optional]: An object contain key-values to be added as custom headers in the request. There is no need to provide authorization headers, Drafts will add those.
   * * parameters [object, optional]: An object containing key-values to be added to the request as URL parameters.
   * * data [object, optional]: An object containing data to be encoded into the HTTP body of the request.
   */
  request(settings: {
    url: string
    method: string
    headers?: { [x: string]: string }
    parameters?: { [x: string]: string }
    data?: { [x: string]: string }
  }): HTTPResponse

  /**
   * Creates a new Todoist object. Identifier is a optional string value used to identify a Todoist account. Typically this can be omitted if you only work with one Todoist account in Drafts. Each unique identifier used for Twitter accounts will share credentials - across both action steps and scripts.
   */
  static create(identifier: string): Todoist
}

/**
 * Script integration with Twitter. The updateStatus method is a convenience method for posting a tweet, but the entire [Twitter API](https://developer.twitter.com/en/docs/api-reference-index) can be used with the request method, which handles OAuth authentication and authorization.
 *
 * https://reference.getdrafts.com/objects/Twitter.html
 */
declare class Twitter {
  /**
   * Post a status update (tweet) to Twitter. Returns true if successful, false if not. After success the lastResponse object can be used to inspect response and get details such as the ID of the tweet created. Refer to [Twitter API POST /status/update documentation](https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-update) for response details.
   */
  updateStatus(content: string): boolean

  /**
   * Execute a request against the Twitter API. For successful requests, the HTTPResponse object will contain an object or array or objects decoded from the JSON returned by Twitter as appropriate to the request made. Refer to Twitter’s API documentation for details about the expected parameters and responses. Drafts will handle wrapping the request in the appropriate OAuth authentication flow.
   * @param settings an object with the following properties:
   * * url [string, required]: The full URL to the endpoint in the [Twitter API](https://developer.twitter.com/en/docs/api-reference-index).
   * * method [string, required]: The HTTP method, like "GET", "POST", etc.
   * * headers [object, optional]: An object contain key-values to be added as custom headers in the request. There is no need to provide authorization headers, Drafts will add those.
   * * parameters [object, optional]: An object containing key-values to be added to the request as URL parameters.
   * * data [object, optional]: An object containing data to be encoded into the HTTP body of the request.
   */
  request(settings: {
    url: string
    method: string
    headers?: { [x: string]: string }
    parameters?: { [x: string]: string }
    data?: { [x: string]: string }
  }): HTTPResponse

  /**
   * Creates a new Twitter object. Identifier is a optional string value used to identify a Twitter account. Typically this can be omitted if you only work with one Twitter account in Drafts. Each unique identifier used for Twitter accounts will share credentials - across both action steps and scripts.
   */
  static create(identifier: string): Twitter
}

/**
 * Script integration with WordPress sites via the [WordPress XML-RPC API](https://codex.wordpress.org/XML-RPC_WordPress_API). Currently this object has one runMethod function which can be used to call any method available in the XML-RPC interface.
 *
 * The WordPress API offers access to a wide variety of functions, including posting, but also retrieving information about categories, tags - or reading posts contents.
 *
 * Drafts WordPress object simplifies working with the XML-RPC interface by accepting input parameters as Javascript objects and converting them to the require XML to make requests of the WordPress site. Similarly, it converts to XML returned by WordPress to Javascript objects. Otherwise it is an exact passthrough, so the [WordPress API reference](https://codex.wordpress.org/XML-RPC_WordPress_API) should be used to determine method names (e.g. `wp.newPost`, `wp.getTaxonomies`) available, the appropriate parameters to send.
 *
 * The WordPress XML-RPC API authenticates via username and password, so it is highly recommended you interact only over HTTPS secure connections, and use `Credential` objects to store host/username/password values, rather than hard-coding them in actions.
 *
 * https://reference.getdrafts.com/objects/WordPress.html
 */
declare class WordPress {
  // convenience
  getPost(postId: string): object | undefined
  newPost(content: string): string | undefined
  getPosts(filter?: any): object[] | undefined
  getPostStatusList(): object[] | undefined
  getTaxonomy(taxonomy?: string): object | undefined
  getTaxonomies(): object[] | undefined
  getTerms(taxonomy?: string, filter?: any): object[] | undefined
  getCategories(): object[] | undefined
  getTags(): object[] | undefined

  /**
   * Run an XML-RPC API method on a WordPress site. Any method name supported by the [WordPress XML-RPC API](https://codex.wordpress.org/XML-RPC_WordPress_API) can be used, as long as the authentication information provided has appropriate permissions on the site.
   * @param methodName The method name as documented in the WordPress XML-RPC API, for example `wp.newPost` to create a new post.
   * @param parameters Parameters should be a Javascript array of parameters for the method being used. These vary depending on the method and should follow the documentation provided by WordPress.
   */
  runMethod(methodName: string, parameters: any[]): XMLRPCResponse

  /**
   *
   * @param siteURL This should be the full URL to the home page of the WordPress site. e.g. `https://mysite.com` or `https://mysite.com/blog/`.
   * @param blogId For most WordPress installations, use `1`.
   * @param username Username to login to the WordPress site. Optional if only using runMethod, as credentials will be required directly in parameters for those calls.
   * @param password Password to login to the WordPress site. Optional if only using runMethod, as credentials will be required directly in parameters for those calls.
   */
  static create(
    siteURL: string,
    blogId: string,
    username?: string,
    password?: string
  ): WordPress
}

type sortDirections = 'created' | 'modified' | 'accessed' | 'name'
/**
 * Represents a Workspace. Can be used to inquire and load workspaces and apply them using methods on the App object.
 *
 * https://reference.getdrafts.com/objects/Workspace.html
 */
declare class Workspace {
  /**
   * The name of the workspace.
   */
  name: string

  /**
   * Search string to filter results.
   */
  queryString: string

  /**
   * Tag string like "blue, !green" using "!" to omit a tag.
   */
  tagFilter: string

  /**
   * If `true`, all (AND) tags in the tag filter must match, if `false` match any of the tags (OR)
   */
  tagFilterRequireAll: boolean

  /**
   * Show preview of draft body in list.
   */
  showPreview: boolean

  /**
   * Show draft tags in list.
   */
  showTags: boolean

  /**
   * Show last logged action for draft in list.
   */
  showLastAction: boolean

  /**
   * Should flagged drafts be included in inbox
   */
  inboxIncludesFlagged: boolean

  /**
   * Should flagged drafts be included in archive
   */
  archiveIncludesFlagged: boolean

  /**
   * Save changes made to the workspace to the database. This must be called to save changes.
   */
  update(): void

  /**
   * Set sort order for inbox.
   */
  setInboxSort(sortBy: sortDirections, sortDescending: boolean): void

  /**
   * Query for a list of drafts contained in the workspace.
   */
  query(filter: 'inbox' | 'archive' | 'flagged' | 'trash' | 'all'): Draft[]

  /**
   * Set sort order for flagged.
   */
  setFlaggedSort(
    sortBy: sortDirections,
    sortDescending: boolean,
    sortFlaggedToTop: boolean
  ): void

  /**
   * Set sort order for archive.
   */
  setFlaggedSort(
    sortBy: sortDirections,
    sortDescending: boolean,
    sortFlaggedToTop: boolean
  ): void

  /**
   * Set sort order for "all" drafts folder.
   */
  setFlaggedSort(
    sortBy: sortDirections,
    sortDescending: boolean,
    sortFlaggedToTop: boolean
  ): void

  /**
   * create a new workspace object. This is an in-memory object only, unless `update()` is called to save the it.
   */
  static create(): Workspace

  /**
   * Get list of all available workspaces.
   */
  static getAll(): Workspace[]

  /**
   * Search for workspace matching the name passed and return it if found. Returns undefined if not found.
   */
  static find(name: string): Workspace | undefined
}

/**
 * The XMLRPC object is a convenience method to provide an easy way to [XML-RPC](http://xmlrpc.scripting.com/) web services. The request function takes care of converting native Javascript objects and values to the XML parameters required for the XML-RPC interface, and converts the XML responses returned to Javascript objects.
 *
 * It will also return faults parsed to error messages in the response if necessary.
 *
 * This object is suitable for communication with a number of popular XML-RPC interfaces, including the [MetaWeblog API](http://xmlrpc.scripting.com/metaWeblogApi.html). WordPress also offers it’s own XML-RPC interface, which can be used via this object, or the convenience wrapper `WordPress` object.
 *
 * https://reference.getdrafts.com/objects/XMLRPC.html
 */
declare class XMLRPC {
  /**
   * Make an XML-RPC request.
   * @param url The full URL of the XML-RPC host endpoint being called.
   * @param methodName Name of the method to call. Supported values are specific to the services provided by the host.
   * @param params The parameters to pass to the request. This should be an array of values, in the proper order, as specified by the documentation of the host being called. This array will be encoded into XML-RPC parameters in XML format by the method - only raw javascript values should be provided.
   */
  static request(url: string, methodName: string, params: any[]): XMLRPCResponse
}

/**
 * XMLRPCResponse objects are returned by calls to using XML-RPC interfaces.
 *
 * https://reference.getdrafts.com/objects/XMLRPCResponse.html
 */
declare class XMLRPCResponse {
  /**
   * whether the request was completed successfully. This value will be `true` if both the HTTP status code is 200 and no fault code was returned from the API.
   */
  success: boolean

  /**
   * The HTTP status code (like 200, 301, etc.) returned. This will be 200 if communication with the XML-RPC endpoint was successful, even if a fault occurred processing the request. Be sure to use the `success` property and `faultCode` to check for errors.
   */
  statusCode: number

  /**
   * The array of return parameters provided by with the XML-RPC response. Contents of this array will vary with the XML-RPC API being used.
   */
  params: any[]

  /**
   * If the XML-RPC interface returned an error, the error code will be here.
   */
  faultCode?: number

  /**
   * If an error occurred, a description of the type of error.
   */
  error?: string
}
