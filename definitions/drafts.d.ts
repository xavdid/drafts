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
   * Opens the URL with associated parameters, and waits for a callback response. Returns true if an x-success response was received from the target app, otherwise false. If false, use the “status” property to determine the type of failure.
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
 * A single global “context” object is available to scripts to control flow of the currently running action.
 *
 * It is important to understand that `cancel()` and `fail()` will not immediately stop script, just stop any further action steps from being performed.
 *
 * https://reference.getdrafts.com/objects/Context.html
 */
declare class Context {
  /**
   * If [Callback URL]() or [Run Workflow]() action steps using the “Wait for response” option have been run in steps before the script step in an action, and the target app returned to Drafts using an x-success callback, this object will contain an array of objects with the parsed query parameters included in those responses, in the order they were received. FIXME: links here
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
 * The user can delete those credentials at any time by visiting Settings > Credentials and tapping the “Forget” button on a service.
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
   * Deletes the credentials provided by the user. This is the same as the user visiting settings and tapping “Forget” for the credentials.
   */
  forget(): void
}

/**
 * Drafts defines a single global “device” object which provides access to information about the current device.
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
 * The Draft object represents a single draft. When an action is run, the current draft is available as the global variable “draft”. Scripts can also create new drafts, access and set values, and update the draft to persist changes.
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
   * create a new draft object. This is an in-memory object only, unless “update()” is called to save the draft.
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
   * @param isLocal If `true`, the `FileManager` will be using the to the local Drafts app documents directory as its root directory, as it appears in the “On my …” area in the `Files.app`. If `false`, it will use the Drafts5 iCloud folder as its root directory.
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
 * Display of HTML Preview window, the same as the HTMLPreview action step. Returns true if user closed preview with the “Continue” button, false if the user cancelled.
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
   * * method [string, required]: The HTTP method, like “GET”, “POST”, etc.
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
 * https://reference.getdrafts.com/objects/HTTPResponse
.html
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
 * The Mail object can be used to create and send mail messages, similar to those created by a “Mail” action step.
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
 * The Message object can be used to create and send mail iMessages, similar to those created by a “Message” action step.
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
   * @param templateName The name of a template file in the directory passed to create the MustacheTemplate object. Do not include the “.mustache” file extension. For example, if you have a “Document.mustache” file in the directory, pass templateName “Document”.
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

/**
 * Represents a Workspace. Can be used to inquire and load workspaces and apply them using methods on the App object.
 *
 * https://reference.getdrafts.com/objects/Workspace.html
 */
declare class Workspace {}
