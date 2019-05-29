require.config({
  paths: {
    vs: 'node_modules/monaco-editor/min/vs',
    prettier: 'node_modules/prettier'
  }
})
require([
  'vs/editor/editor.main',
  'prettier/standalone',
  'prettier/parser-babylon'
], function(monaco, prettier, ...plugins) {
  monaco.languages.typescript.javascriptDefaults.addExtraLib(`
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
   * Search for action group matching the name passed and return it if found. Returns \`undefined\` if not found.
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
   * @param action Actions can be obtained using the \`Action.find()\` method.
   * @param draft A draft object
   */
  queueAction(action: Action, draft: Draft): boolean

  /**
   * Open draft selection interface and wait for user to select a draft. Returns the select draft object, or \`undefined\` if user cancelled.
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
   * Reads the contents of the file at the path as a string. Returns \`undefined\` value if the file does not exist or could not be read. Paths should begin with a \`/\` and be relative to the root directory of your Box.com account.
   * @param path
   */
  read(path: string): string

  /**
   * Write the contents of the file at the path. Returns true if successful, false if the file could not be written successfully. This will override existing files!
   * @param path Paths should begin with a \`/\` and be relative to the root directory of your Box
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
   * Searches for a calendar matching the title. If none is found, return \`undefined\`.
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
 * **NOTE**: If you want to open a URL in Safari or another app and do not need a response or x-callback-url support, use the \`app.openURL(url)\` method on the App object.
 *
 * https://reference.getdrafts.com/objects/CallbackURL.html
 */
declare class CallbackURL {
  /**
   * The baseURL of the request. This should include the x-callback-url base URL and action, typically something like \`app-scheme://x-callback-url/actionName\`
   */
  baseURL: string

  /**
   * If true, the script will pause and wait for the \`x-success\`, \`x-error\` or \`x-cancel\` response from the app being targeted by the URL. If false, execution of the script/action will continue immediately and no response/results will be available.
   */
  waitForResponse: boolean

  /**
   * Object containing string keys and values to be appended to the base url as query parameters. Values should not be pre-encoded, but will be encoded and added to the base URL automatically. Do not include x-callback parameters (\`x-success\`, \`x-error\`, \`x-cancel\`) as these will be generated by Drafts.
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
   * An object contain and URL query parameters returned by the target app along with it’s callback response. For example, if the target app called x-success with the query parameters \`result=MyTestText\`, callbackResponse would contain \`{"result": "MyTestText"}\`.
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
 * It is important to understand that \`cancel()\` and \`fail()\` will not immediately stop script, just stop any further action steps from being performed.
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
   * Tell the context to fail the current action. In effect this is the same as \`cancel()\` but an error notification will be shown. If a message is included it will be added to the action log to explain the cancellation.
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
   * runs the passed template string through the template engine to evaluate tags (like \`[[title]]\`, \`[[body]]\`).
   */
  processTemplate(template: string): string

  /**
   * set a custom tag value for use in templates. For example, calling \`setTemplateTag("mytag", "mytext")\` will create a tag \`[[mytag]]\`, which subsequent action step templates can use.
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
   * @param queryString Search string, as you would type in the search box in the draft list. Will find only drafts with a matching string in their contents. Use empty string (\`""\`) not to filter.
   * @param filter Filter by one of the allowed values
   * @param tags Results will only include drafts with one or more of these tags assigned.
   * @param omitTags Results will omit drafts with any of these tags assigned.
   * @param sort
   * @param sortDescending If \`true\`, sort descending. Defaults to \`false\`.
   * @param sortFlaggedToTop If \`true\`, sort flagged drafts to beginning. Defaults to \`false\`.
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
   * If a function fails, this property will contain the last error as a string message, otherwise it will be \`undefined\`.
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
   * Add an alarm object to the event. Be sure to \`update()\` to save after adding alarms.
   */
  addAlarm(alarm: Alarm): void

  /**
   * Remove any assigned alarms from the event.
   */
  removeAllAlarms(): void
}

/**
 * FileManager objects can be used to read from or write to files in either the local Drafts app Documents directory (as visible in the \`Files.app\`), or iCloud Drive (inside the \`Drafts5\` folder).
 *
 * https://reference.getdrafts.com/objects/FileManager.html
 */
declare class FileManager {
  /**
   * If a function fails, this property will contain the last error as a string message, otherwise it will be \`undefined\`.
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
   * Reads the contents of the file at the path. Returns \`undefined\` value if the file does not exist or could not be read.
   * @param path should begin with a \`/\` and be relative to the root directory of the FileManager.
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
   * Move file or directory at \`fromPath\` to the \`toPath\`. From and to path should be complete paths with file names included.
   * @param fromPath
   * @param toPath
   * @param overwrite If true, replace existing files in at the toPath. If false, abort operation if file exists at destination.
   */
  moveItem(fromPath: string, toPath: string, overwrite?: boolean): boolean

  /**
   * Copy file or directory at \`fromPath\` to the \`toPath\`. From and to path should be complete paths with file names included.
   * @param fromPath
   * @param toPath
   * @param overwrite If true, replace existing files in at the toPath. If false, abort operation if file exists at destination.
   */
  copyItem(fromPath: string, toPath: string, overwrite?: boolean): boolean

  /**
   * Creates a new FileManager object.
   * @param isLocal If \`true\`, the \`FileManager\` will be using the to the local Drafts app documents directory as its root directory, as it appears in the "On my …" area in the \`Files.app\`. If \`false\`, it will use the Drafts5 iCloud folder as its root directory.
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
 * @param path  relative path to javascript file in the iCloud Drive \`/Drafts/Library/Scripts\` folder. For example, to load the script in the file \`test.js\` in the \`iCloud Drive/Drafts/Library/Scripts/Utilities/\` folder, use the path parameter \`Utilities/test.js\`.
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
   * Array of email addresses to use as \`To:\` recipients. Each entry can be a valid email address, or a name and email in the format \`Name<email>\`.
   */
  toRecipients: string[]
  /**
   * Array of email addresses to use as \`CC:\` recipients. Each entry can be a valid email address, or a name and email in the format \`Name<email>\`.
   */
  ccRecipients: string[]
  /**
   * Array of email addresses to use as \`BCC:\` recipients. Each entry can be a valid email address, or a name and email in the format \`Name<email>\`.
   */
  bccRecipients: string[]

  subject: string

  /**
   * Body text of the mail message. Can be plain text or HTML if the \`isBodyHTML\` property is set to \`true\`.
   */
  body: string

  /**
   * whether to treat the body string and plain text or HTML. When set to \`true\`, the \`body\` property should be set to full valid HTML.
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
   * If a function fails, this property will contain the last error as a string message, otherwise it will be \`undefined\`.
   */
  lastError: string | undefined

  /**
   * Reads the contents of the file at the with the file name, in the parent folder, as a string. Returns \`undefined\` value if the file does not exist or could not be read.
   * @param fileName
   * @param parent Name of folder in the root of the Google Drive, or \`""\` for root. FIXME: optional?
   */
  read(fileName: string, parent: string): string | undefined

  /**
   * Write the contents of the file at the path. Returns true if successful, false if the file could not be written successfully. This will override existing files!
   * @param fileName
   * @param parent Name of folder in the root of the Google Drive, or \`""\` for root.
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
   * Array of email addresses to use as \`To:\` recipients.
   */
  toRecipients: string[]

  /**
   * Array of email addresses to use as \`CC:\` recipients.
   */
  ccRecipients: string[]

  /**
   * Array of email addresses to use as \`BCC:\` recipients.
   */
  bccRecipients: string[]

  /**
   * Subject line
   */
  subject: string

  /**
   * Body text of the mail message. Can be plain text or HTML if the \`isBodyHTML\` property is set to \`true\`.
   */
  body: string

  /**
   * whether to treat the body string and plain text or HTML. When set to \`true\`, the \`body\` property should be set to full valid HTML.
   */
  isBodyHTML: boolean

  /**
   * If \`true\`, the mail will be sent in the background using a web service rather than via Mail.app - but will come from \`drafts5@drafts5.agiletortoise.com\`. Defaults to \`false\`.
   */
  sendInBackground: boolean

  /**
   * indicates if the message object has already been sent.
   */
  isSent: boolean

  /**
   * One of the following values:
   * * created: Initial value before \`send()\` has been called.
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
   * Send the mail message. This will open the \`Mail.app\` sending window. Returns \`true\` if the message was sent successfully or \`false\` if not - if, for example, the user cancelled the mail window.
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
   * Array of phone numbers and email addresses to use as \`To:\` recipients.
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
   * * created: Initial value before \`send()\` has been called.
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
   * Send the message. This will open the \`Messages.app\` sending window. Returns \`true\` if the message was sent successfully or \`false\` if not - if, for example, the user cancelled the message window.
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
   * * \`html\`: HTML. This is the default Markdown output.
   * * \`epub\`: ePub
   * * \`latex\`: LaTeX
   * * \`beamer\`
   * * \`memoir\`
   * * \`odt\`: Open document format
   * * \`mmd\`
   */
  format: 'html' | 'epub' | 'latex' | 'beamer' | 'memoir' | 'odt' | 'mmd'

  /**
   * defaults to \`false\`
   */
  markdownCompatibilityMode: boolean
  /**
   * defaults to \`false\`
   */
  completeDocument: boolean
  /**
   * defaults to \`false\`
   */
  snippetOnly: boolean
  /**
   * defaults to \`true\`
   */
  smartQuotesEnabled: boolean
  /**
   * defaults to \`true\`
   */
  footnotesEnabled: boolean
  /**
   * defaults to \`true\`
   */
  noLabels: boolean
  /**
   * defaults to \`true\`
   */
  processHTML: boolean
  /**
   * defaults to \`false\`
   */
  noMetadata: boolean
  /**
   * defaults to \`false\`
   */
  obfuscate: boolean
  /**
   * defaults to \`false\`
   */
  criticMarkup: boolean
  /**
   * defaults to \`false\`
   */
  criticMarkupAccept: boolean
  /**
   * defaults to \`false\`
   */
  criticMarkupReject: boolean
  /**
   * defaults to \`false\`
   */
  randomFootnotes: boolean
  /**
   * defaults to \`false\`
   */
  transclude: boolean

  static create(): MultiMarkdown
}

/**
 * The MustacheTemplate object support rendering of templates using the [Mustache](https://en.wikipedia.org/wiki/Mustache_%28template_system%29) template style.
 *
 * Mustache templates offer advanced features for iterating over items, creating conditional blocks of text and more. This is still a bit of an experimental feature, please send feedback if you are finding edge cases or are interested in more functionality in this area.
 *
 * The object can be used in one of two ways, by passing a specific template as a string and rendering it, or by passing a path to a subdirectory of the \`iCloud Drive/Drafts/Library/Templates\` folder which can contain more than one Mustache style templates (with file extension \`.mustache\`), and then rendering them. The late method has the advantage of supporting the use of partial templates in the same folder.
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
   * Use in combination with \`createWithTemplate(template)\` to render the template using the data passsed.
   * @param data A Javascript object with the values to use when rendering the template. The object can have nested sub-objects.
   */
  render(data: { [x: string]: any }): string

  /**
   * Use in combination with \`createWithPath(path)\` to render the template using the data passsed.
   * @param templateName The name of a template file in the directory passed to create the MustacheTemplate object. Do not include the ".mustache" file extension. For example, if you have a "Document.mustache" file in the directory, pass templateName "Document".
   * @param data  A Javascript object with the values to use when rendering the template. The object can have nested sub-objects.
   */
  renderTemplate(templateName: string, data: any): string

  /**
   * Determines how the Mustache engine renders output. Valid options:
   * * \`text\`: Render the output as plain text, do not do additional encoding of entities.
   * * \`html\`: Render output as escaped HTML with entities converted for use in HTML.
   */
  contentType: 'text' | 'html'

  /**
   * Create a new object with a template
   * @param template a valid Mustache template string
   */
  createWithTemplate(template: string): MustacheTemplate

  /**
   * Create a new object configured to point to a directory of Mustache template files in iCloud Drive. When using this method, other Mustache template located in the same directory will be available to be used as partials in the rendering process.
   * @param path Relative path to a directory of Mustache template files (with .mustache file extension) located in \`iCloud Drive/Drafts/Library/Templates\`. For example to refer to templates in the directory \`iCloud Drive/Drafts/Library/Templates/My Mustache Templates/\`, pass \`My Mustache Templates/\` to this method.
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
   * Reads the contents of the file at the path as a string. Returns undefined value if the file does not exist or could not be read. Paths should begin with a \`/\` and be relative to the root directory of your OneDrive.
   */
  read(path: string): string

  /**
   * Write the contents of the file at the path. Returns true if successful, false if the file could not be written successfully. This will override existing files!
   * @param path Paths should begin with a \`/\` and be relative to the root directory of your OneDrive
   * @param content Text to place in the file
   * @param overwrite If \`false\`, an existing file will not be overwritten
   */
  write(path: string, content: string, overwrite?: boolean): boolean

  /**
   *
   * @param identifier Optional identifier for OneDrive account to use. This string is an arbitrary value, but we recommend using the email address you wish to associate with the script. Each unique identifier will be associated with its own [Credential](https://getdrafts.com/settings/credentials).
   */
  static create(identifier?: string): OneDrive
}

/**
 * The OutlookMessage object can be used to create and send mail messages through Outlook.com integrated accounts, similar to those created by a [Outlook action step](https://getdrafts.com/actions/steps/outlook). Creating and sending these messages happens in the background, with no user interface, so messages must be complete with recipients before calling \`send()\`. Sending is done via the [Microsoft Graph API](https://developer.microsoft.com/en-us/graph). Outlooks accounts are authenticated when used for the first time using OAuth - to use more than one account, call create with different identifier parameters.
 *
 * https://reference.getdrafts.com/objects/OutlookMessage.html
 */
declare class OutlookMessage {
  /**
   * Array of email addresses to use as \`To:\` recipients. Each entry can be a valid email address, or a name and email in the format \`Name<email>\`.
   */
  toRecipients: string[]
  /**
   * Array of email addresses to use as \`CC:\` recipients. Each entry can be a valid email address, or a name and email in the format \`Name<email>\`.
   */
  ccRecipients: string[]
  /**
   * Array of email addresses to use as \`BCC:\` recipients. Each entry can be a valid email address, or a name and email in the format \`Name<email>\`.
   */
  bccRecipients: string[]

  subject: string

  /**
   * Body text of the mail message. Can be plain text or HTML if the \`isBodyHTML\` property is set to \`true\`.
   */
  body: string

  /**
   * whether to treat the body string and plain text or HTML. When set to \`true\`, the \`body\` property should be set to full valid HTML.
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
   * If true, a "Cancel" button will be included in the dialog. Defaults to \`true\`. If the user selects the cancel button, the \`show()\` method will return \`false\`. If \`false\`, no cancel button will be displayed and the user must select one of the button name options.
   */
  isCancellable: boolean

  /**
   * After the \`show()\` method is called, this property will contain values from any fields added to the prompt. The dictionary keys will be the names of the fields as passed in when they were created, and the value will be the current contents of that field. They type of data depends on the type of field.
   */
  fieldValues: { [x: string]: any }

  /**
   * After the \`show()\` method is called, this property will contain the name of the button selected by the user.
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
   * @param name Identifier for the field. This will be used as the key in the \`fieldValues\` dictionary to access the contents of the field after calling \`show()\`.
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
   * @param name Identifier for the field. This will be used as the key in the \`fieldValues\` dictionary to access the contents of the field after calling \`show()\`.
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
   * Add an on/off toggle switch. The \`fieldValues\` entry for this item will be a boolean indicating whether the switch was on.
   * @param name Identifier for the field. This will be used as the key in the \`fieldValues\` dictionary to access the contents of the field after calling \`show()\`.
   * @param label User-friendly text label to place next to the field.
   * @param initialValue indicate if the switch should be on or off when initially displayed.
   */
  addSwitch(name: string, label: string, initialValue: boolean): void

  /**
   * Add a date and/or time picker to the prompt, with the arguments as below. The \`fieldValues\` entry for this will be a date object.
   * @param name Identifier for the field. This will be used as the key in the \`fieldValues\` dictionary to access the contents of the field after calling \`show()\`.
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
   * Add a picker to the prompt, with the arguments as below. Picker can contain multiple rows. The \`fieldValues\` entry for this will be a array of selected index values object.
   * @param name Identifier for the field. This will be used as the key in the \`fieldValues\` dictionary to access the contents of the field after calling \`show()\`.
   * @param label User-friendly text label to place next to the field.
   * @param columns The values to display in the picker. Should be an array containing arrays of string values, each sub-array representing a column in the picker. Example two column picker: \`[["Item 1", "Item 2"],["Column 2 Item 1", "Column 2 Item 2"]]\`
   * @param selectedRows Array of zero-based index values to set the initial selected row in each column.
   */
  addPicker(
    name: string,
    label: string,
    columns: string[][],
    selectedRows: number[]
  ): void

  /**
   * Add a select control. Returns an array of string values in \`fieldValues\`.
   * @param name Identifier for the field. This will be used as the key in the \`fieldValues\` dictionary to access the contents of the field after calling \`show()\`.
   * @param label User-friendly text label to place next to the field.
   * @param values The array of string values that will be available to select.
   * @param selectedValues Array of string values that should be initially selected when the prompt is displayed. All values in this array should match values in the \`values\` array.
   * @param allowMultiple If \`false\`, selecting a value will deselect all other values. If \`true\`, the user may select multiple items.
   */
  addSelect(
    name: string,
    label: string,
    values: string[],
    selectedValues: string[],
    allowMultiple: boolean
  ): void

  /**
   * Add a button to the array of buttons to be displayed. All buttons should be created before calling \`show()\`.
   * @param name
   * @param value only needed to associate a different value than will be displayed in the button. For example, if you call \`prompt.addButton("First Button", 1)\`, after calling \`prompt.show()\` if that button is pressed, the \`prompt.buttonPressed\` will contain the number value \`1\`.
   * @param isDefault used to specify a single button which will be pinned to the bottom of the prompt and respond to \`cmd + return\` as the default button. If only one button is added to a prompt, it is assumed to be the default.
   */
  addButton(name: string, value?: string, isDefault?: boolean): void

  /**
   * Displays the prompt. Returns \`true\` if the user selected one of the buttons in the buttons array, \`false\` if the user selected the "Cancel" button. After the dialog has been shown, the \`buttonPressed\` property will contain the name of the button selected by the user.
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
   * * \`0\`: No priority
   * * \`1\`: High
   * * \`5\`: Medium
   * * \`9\`: Low
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
   * Add an alarm object to the reminder. Be sure to \`update()\` to save after adding alarms. Return \`true\` if the alarm was successfully added. Note that reminders only support alarms created with the \`Alarm.alarmWithDate\` method.
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
   * Open system share sheet to share the string provided as text. Returns \`true\` if share was completed by user, \`false\` if input was invalid or user cancelled the share.
   */
  static shareAsText(text: string): boolean

  /**
   * Open system share sheet to share the url provided as a URL object. Returns \`true\` if share was completed by user and \`false\` if input was invalid or user cancelled share.
   * @param url should be a complete and valid URL
   */
  static shareAsURL(url: string): boolean

  /**
   * Open system share sheet to share the content as a file, with the specified file name (with e). Returns \`true\` if share was completed by user amd \`false\` if input was invalid or user cancelled share. Drafts will create a temporary file for the purposes of the share and send it to the share sheet. The temporary file will be deleted after. Useful, for example, to create a text file and share to Mail, and it will be shared as an attachment to the email
   */
  static shareAsFile(filename: string, text: string): boolean
}

/**
 * [Things](https://culturedcode.com/things/) is a popular task and project management app from Cultured Code. Things supports advanced URL schemes (required Things v3.4 or greater on iOS) which can accept multiple todos, projects, headings in a single call to the app. The scripting interfaces below are convenience wrappers that allow easy creation and encoding of the URLs needed to pass this type of information to Things.
 *
 * The Javascript objects are wrappers around an [open source Swift library](https://github.com/culturedcode/ThingsJSONCoder) provided by Cultured Code, with a few modifications to work in Javascript. In all cases, nothing is committed to Things until the the items are wrapped in a TJSContainer, and the URL it generates called to send the data to Things. This is best done with Drafts’ \`CallbackURL\` object (see example below).
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
 * The \`quickAdd\` method is mostly likely what you are looking for to create tasks as it supports the shorthand the task entry box in Todoist supports to parse projects, etc.
 *
 * Other methods are direct mappings of the REST API calls provided by Todoist. Most take an \`options\` parameter which is a javascript object containing the parameters to be passed to the API, and and the method decodes the JSON response from Todoist and returns it as a Javascript object (or array of objects) with the values as specified in the Todoist API docs.
 *
 * If an API calls fails, typically the result will be an \`undefined\` value, and the \`lastError\` property will contains error detail information for troubleshooting.
 *
 * https://reference.getdrafts.com/objects/Todoist.html
 */
declare class Todoist {
  /**
   * If a function success, this property will contain the last response returned by Todoist. The JSON returned by Todoist will be parsed to an object and placed in this property. Refer to [Todoist API documentation](https://developer.todoist.com/rest/v8) for details on the contents of this object based on call made.
   */
  lastResponse: any

  /**
   * If a function fails, this property will contain the last error as a string message, otherwise it will be \`undefined\`.
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
 * Drafts WordPress object simplifies working with the XML-RPC interface by accepting input parameters as Javascript objects and converting them to the require XML to make requests of the WordPress site. Similarly, it converts to XML returned by WordPress to Javascript objects. Otherwise it is an exact passthrough, so the [WordPress API reference](https://codex.wordpress.org/XML-RPC_WordPress_API) should be used to determine method names (e.g. \`wp.newPost\`, \`wp.getTaxonomies\`) available, the appropriate parameters to send.
 *
 * The WordPress XML-RPC API authenticates via username and password, so it is highly recommended you interact only over HTTPS secure connections, and use \`Credential\` objects to store host/username/password values, rather than hard-coding them in actions.
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
   * @param methodName The method name as documented in the WordPress XML-RPC API, for example \`wp.newPost\` to create a new post.
   * @param parameters Parameters should be a Javascript array of parameters for the method being used. These vary depending on the method and should follow the documentation provided by WordPress.
   */
  runMethod(methodName: string, parameters: any[]): XMLRPCResponse

  /**
   *
   * @param siteURL This should be the full URL to the home page of the WordPress site. e.g. \`https://mysite.com\` or \`https://mysite.com/blog/\`.
   * @param blogId For most WordPress installations, use \`1\`.
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
   * If \`true\`, all (AND) tags in the tag filter must match, if \`false\` match any of the tags (OR)
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
   * create a new workspace object. This is an in-memory object only, unless \`update()\` is called to save the it.
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
 * This object is suitable for communication with a number of popular XML-RPC interfaces, including the [MetaWeblog API](http://xmlrpc.scripting.com/metaWeblogApi.html). WordPress also offers it’s own XML-RPC interface, which can be used via this object, or the convenience wrapper \`WordPress\` object.
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
   * whether the request was completed successfully. This value will be \`true\` if both the HTTP status code is 200 and no fault code was returned from the API.
   */
  success: boolean

  /**
   * The HTTP status code (like 200, 301, etc.) returned. This will be 200 if communication with the XML-RPC endpoint was successful, even if a fault occurred processing the request. Be sure to use the \`success\` property and \`faultCode\` to check for errors.
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

  `)

  monaco.languages.typescript.javascriptDefaults.addExtraLib(`
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved. 
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0  
 
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE, 
MERCHANTABLITY OR NON-INFRINGEMENT. 
 
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */



/// <reference no-default-lib="true"/>


/////////////////////////////
/// ECMAScript APIs
/////////////////////////////

declare const NaN: number;
declare const Infinity: number;

/**
  * Evaluates JavaScript code and executes it.
  * @param x A String value that contains valid JavaScript code.
  */
declare function eval(x: string): any;

/**
  * Converts A string to an integer.
  * @param s A string to convert into a number.
  * @param radix A value between 2 and 36 that specifies the base of the number in numString.
  * If this argument is not supplied, strings with a prefix of '0x' are considered hexadecimal.
  * All other strings are considered decimal.
  */
declare function parseInt(s: string, radix?: number): number;

/**
  * Converts a string to a floating-point number.
  * @param string A string that contains a floating-point number.
  */
declare function parseFloat(string: string): number;

/**
  * Returns a Boolean value that indicates whether a value is the reserved value NaN (not a number).
  * @param number A numeric value.
  */
declare function isNaN(number: number): boolean;

/**
  * Determines whether a supplied number is finite.
  * @param number Any numeric value.
  */
declare function isFinite(number: number): boolean;

/**
  * Gets the unencoded version of an encoded Uniform Resource Identifier (URI).
  * @param encodedURI A value representing an encoded URI.
  */
declare function decodeURI(encodedURI: string): string;

/**
  * Gets the unencoded version of an encoded component of a Uniform Resource Identifier (URI).
  * @param encodedURIComponent A value representing an encoded URI component.
  */
declare function decodeURIComponent(encodedURIComponent: string): string;

/**
  * Encodes a text string as a valid Uniform Resource Identifier (URI)
  * @param uri A value representing an encoded URI.
  */
declare function encodeURI(uri: string): string;

/**
  * Encodes a text string as a valid component of a Uniform Resource Identifier (URI).
  * @param uriComponent A value representing an encoded URI component.
  */
declare function encodeURIComponent(uriComponent: string): string;

/**
  * Computes a new string in which certain characters have been replaced by a hexadecimal escape sequence.
  * @param string A string value
  */
declare function escape(string: string): string;

/**
  * Computes a new string in which hexadecimal escape sequences are replaced with the character that it represents.
  * @param string A string value
  */
declare function unescape(string: string): string;

interface Symbol {
  /** Returns a string representation of an object. */
  toString(): string;

  /** Returns the primitive value of the specified object. */
  valueOf(): symbol;
}

declare type PropertyKey = string | number | symbol;

interface PropertyDescriptor {
    configurable?: boolean;
    enumerable?: boolean;
    value?: any;
    writable?: boolean;
    get?(): any;
    set?(v: any): void;
}

interface PropertyDescriptorMap {
    [s: string]: PropertyDescriptor;
}

interface Object {
    /** The initial value of Object.prototype.constructor is the standard built-in Object constructor. */
    constructor: Function;

    /** Returns a string representation of an object. */
    toString(): string;

    /** Returns a date converted to a string using the current locale. */
    toLocaleString(): string;

    /** Returns the primitive value of the specified object. */
    valueOf(): Object;

    /**
      * Determines whether an object has a property with the specified name.
      * @param v A property name.
      */
    hasOwnProperty(v: PropertyKey): boolean;

    /**
      * Determines whether an object exists in another object's prototype chain.
      * @param v Another object whose prototype chain is to be checked.
      */
    isPrototypeOf(v: Object): boolean;

    /**
      * Determines whether a specified property is enumerable.
      * @param v A property name.
      */
    propertyIsEnumerable(v: PropertyKey): boolean;
}

interface ObjectConstructor {
    new(value?: any): Object;
    (): any;
    (value: any): any;

    /** A reference to the prototype for a class of objects. */
    readonly prototype: Object;

    /**
      * Returns the prototype of an object.
      * @param o The object that references the prototype.
      */
    getPrototypeOf(o: any): any;

    /**
      * Gets the own property descriptor of the specified object.
      * An own property descriptor is one that is defined directly on the object and is not inherited from the object's prototype.
      * @param o Object that contains the property.
      * @param p Name of the property.
    */
    getOwnPropertyDescriptor(o: any, p: PropertyKey): PropertyDescriptor | undefined;

    /**
      * Returns the names of the own properties of an object. The own properties of an object are those that are defined directly
      * on that object, and are not inherited from the object's prototype. The properties of an object include both fields (objects) and functions.
      * @param o Object that contains the own properties.
      */
    getOwnPropertyNames(o: any): string[];

    /**
      * Creates an object that has the specified prototype or that has null prototype.
      * @param o Object to use as a prototype. May be null.
      */
    create(o: object | null): any;

    /**
      * Creates an object that has the specified prototype, and that optionally contains specified properties.
      * @param o Object to use as a prototype. May be null
      * @param properties JavaScript object that contains one or more property descriptors.
      */
    create(o: object | null, properties: PropertyDescriptorMap & ThisType<any>): any;

    /**
      * Adds a property to an object, or modifies attributes of an existing property.
      * @param o Object on which to add or modify the property. This can be a native JavaScript object (that is, a user-defined object or a built in object) or a DOM object.
      * @param p The property name.
      * @param attributes Descriptor for the property. It can be for a data property or an accessor property.
      */
    defineProperty(o: any, p: PropertyKey, attributes: PropertyDescriptor & ThisType<any>): any;

    /**
      * Adds one or more properties to an object, and/or modifies attributes of existing properties.
      * @param o Object on which to add or modify the properties. This can be a native JavaScript object or a DOM object.
      * @param properties JavaScript object that contains one or more descriptor objects. Each descriptor object describes a data property or an accessor property.
      */
    defineProperties(o: any, properties: PropertyDescriptorMap & ThisType<any>): any;

    /**
      * Prevents the modification of attributes of existing properties, and prevents the addition of new properties.
      * @param o Object on which to lock the attributes.
      */
    seal<T>(o: T): T;

    /**
      * Prevents the modification of existing property attributes and values, and prevents the addition of new properties.
      * @param o Object on which to lock the attributes.
      */
    freeze<T>(a: T[]): ReadonlyArray<T>;

    /**
      * Prevents the modification of existing property attributes and values, and prevents the addition of new properties.
      * @param o Object on which to lock the attributes.
      */
    freeze<T extends Function>(f: T): T;

    /**
      * Prevents the modification of existing property attributes and values, and prevents the addition of new properties.
      * @param o Object on which to lock the attributes.
      */
    freeze<T>(o: T): Readonly<T>;

    /**
      * Prevents the addition of new properties to an object.
      * @param o Object to make non-extensible.
      */
    preventExtensions<T>(o: T): T;

    /**
      * Returns true if existing property attributes cannot be modified in an object and new properties cannot be added to the object.
      * @param o Object to test.
      */
    isSealed(o: any): boolean;

    /**
      * Returns true if existing property attributes and values cannot be modified in an object, and new properties cannot be added to the object.
      * @param o Object to test.
      */
    isFrozen(o: any): boolean;

    /**
      * Returns a value that indicates whether new properties can be added to an object.
      * @param o Object to test.
      */
    isExtensible(o: any): boolean;

    /**
      * Returns the names of the enumerable properties and methods of an object.
      * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
      */
    keys(o: {}): string[];
}

/**
  * Provides functionality common to all JavaScript objects.
  */
declare const Object: ObjectConstructor;

/**
  * Creates a new function.
  */
interface Function {
    /**
      * Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.
      * @param thisArg The object to be used as the this object.
      * @param argArray A set of arguments to be passed to the function.
      */
    apply(this: Function, thisArg: any, argArray?: any): any;

    /**
      * Calls a method of an object, substituting another object for the current object.
      * @param thisArg The object to be used as the current object.
      * @param argArray A list of arguments to be passed to the method.
      */
    call(this: Function, thisArg: any, ...argArray: any[]): any;

    /**
      * For a given function, creates a bound function that has the same body as the original function.
      * The this object of the bound function is associated with the specified object, and has the specified initial parameters.
      * @param thisArg An object to which the this keyword can refer inside the new function.
      * @param argArray A list of arguments to be passed to the new function.
      */
    bind(this: Function, thisArg: any, ...argArray: any[]): any;

    /** Returns a string representation of a function. */
    toString(): string;

    prototype: any;
    readonly length: number;

    // Non-standard extensions
    arguments: any;
    caller: Function;
}

interface FunctionConstructor {
    /**
      * Creates a new function.
      * @param args A list of arguments the function accepts.
      */
    new(...args: string[]): Function;
    (...args: string[]): Function;
    readonly prototype: Function;
}

declare const Function: FunctionConstructor;

/**
 * Extracts the type of the 'this' parameter of a function type, or 'unknown' if the function type has no 'this' parameter.
 */
type ThisParameterType<T> = T extends (this: unknown, ...args: any[]) => any ? unknown : T extends (this: infer U, ...args: any[]) => any ? U : unknown;

/**
 * Removes the 'this' parameter from a function type.
 */
type OmitThisParameter<T> = unknown extends ThisParameterType<T> ? T : T extends (...args: infer A) => infer R ? (...args: A) => R : T;

interface CallableFunction extends Function {
    /**
      * Calls the function with the specified object as the this value and the elements of specified array as the arguments.
      * @param thisArg The object to be used as the this object.
      * @param args An array of argument values to be passed to the function.
      */
    apply<T, R>(this: (this: T) => R, thisArg: T): R;
    apply<T, A extends any[], R>(this: (this: T, ...args: A) => R, thisArg: T, args: A): R;

    /**
      * Calls the function with the specified object as the this value and the specified rest arguments as the arguments.
      * @param thisArg The object to be used as the this object.
      * @param args Argument values to be passed to the function.
      */
    call<T, A extends any[], R>(this: (this: T, ...args: A) => R, thisArg: T, ...args: A): R;

    /**
      * For a given function, creates a bound function that has the same body as the original function.
      * The this object of the bound function is associated with the specified object, and has the specified initial parameters.
      * @param thisArg The object to be used as the this object.
      * @param args Arguments to bind to the parameters of the function.
      */
    bind<T>(this: T, thisArg: ThisParameterType<T>): OmitThisParameter<T>;
    bind<T, A0, A extends any[], R>(this: (this: T, arg0: A0, ...args: A) => R, thisArg: T, arg0: A0): (...args: A) => R;
    bind<T, A0, A1, A extends any[], R>(this: (this: T, arg0: A0, arg1: A1, ...args: A) => R, thisArg: T, arg0: A0, arg1: A1): (...args: A) => R;
    bind<T, A0, A1, A2, A extends any[], R>(this: (this: T, arg0: A0, arg1: A1, arg2: A2, ...args: A) => R, thisArg: T, arg0: A0, arg1: A1, arg2: A2): (...args: A) => R;
    bind<T, A0, A1, A2, A3, A extends any[], R>(this: (this: T, arg0: A0, arg1: A1, arg2: A2, arg3: A3, ...args: A) => R, thisArg: T, arg0: A0, arg1: A1, arg2: A2, arg3: A3): (...args: A) => R;
    bind<T, AX, R>(this: (this: T, ...args: AX[]) => R, thisArg: T, ...args: AX[]): (...args: AX[]) => R;
}

interface NewableFunction extends Function {
    /**
      * Calls the function with the specified object as the this value and the elements of specified array as the arguments.
      * @param thisArg The object to be used as the this object.
      * @param args An array of argument values to be passed to the function.
      */
    apply<T>(this: new () => T, thisArg: T): void;
    apply<T, A extends any[]>(this: new (...args: A) => T, thisArg: T, args: A): void;

    /**
      * Calls the function with the specified object as the this value and the specified rest arguments as the arguments.
      * @param thisArg The object to be used as the this object.
      * @param args Argument values to be passed to the function.
      */
    call<T, A extends any[]>(this: new (...args: A) => T, thisArg: T, ...args: A): void;

    /**
      * For a given function, creates a bound function that has the same body as the original function.
      * The this object of the bound function is associated with the specified object, and has the specified initial parameters.
      * @param thisArg The object to be used as the this object.
      * @param args Arguments to bind to the parameters of the function.
      */
    bind<T>(this: T, thisArg: any): T;
    bind<A0, A extends any[], R>(this: new (arg0: A0, ...args: A) => R, thisArg: any, arg0: A0): new (...args: A) => R;
    bind<A0, A1, A extends any[], R>(this: new (arg0: A0, arg1: A1, ...args: A) => R, thisArg: any, arg0: A0, arg1: A1): new (...args: A) => R;
    bind<A0, A1, A2, A extends any[], R>(this: new (arg0: A0, arg1: A1, arg2: A2, ...args: A) => R, thisArg: any, arg0: A0, arg1: A1, arg2: A2): new (...args: A) => R;
    bind<A0, A1, A2, A3, A extends any[], R>(this: new (arg0: A0, arg1: A1, arg2: A2, arg3: A3, ...args: A) => R, thisArg: any, arg0: A0, arg1: A1, arg2: A2, arg3: A3): new (...args: A) => R;
    bind<AX, R>(this: new (...args: AX[]) => R, thisArg: any, ...args: AX[]): new (...args: AX[]) => R;
}

interface IArguments {
    [index: number]: any;
    length: number;
    callee: Function;
}

interface String {
    /** Returns a string representation of a string. */
    toString(): string;

    /**
      * Returns the character at the specified index.
      * @param pos The zero-based index of the desired character.
      */
    charAt(pos: number): string;

    /**
      * Returns the Unicode value of the character at the specified location.
      * @param index The zero-based index of the desired character. If there is no character at the specified index, NaN is returned.
      */
    charCodeAt(index: number): number;

    /**
      * Returns a string that contains the concatenation of two or more strings.
      * @param strings The strings to append to the end of the string.
      */
    concat(...strings: string[]): string;

    /**
      * Returns the position of the first occurrence of a substring.
      * @param searchString The substring to search for in the string
      * @param position The index at which to begin searching the String object. If omitted, search starts at the beginning of the string.
      */
    indexOf(searchString: string, position?: number): number;

    /**
      * Returns the last occurrence of a substring in the string.
      * @param searchString The substring to search for.
      * @param position The index at which to begin searching. If omitted, the search begins at the end of the string.
      */
    lastIndexOf(searchString: string, position?: number): number;

    /**
      * Determines whether two strings are equivalent in the current locale.
      * @param that String to compare to target string
      */
    localeCompare(that: string): number;

    /**
      * Matches a string with a regular expression, and returns an array containing the results of that search.
      * @param regexp A variable name or string literal containing the regular expression pattern and flags.
      */
    match(regexp: string | RegExp): RegExpMatchArray | null;

    /**
      * Replaces text in a string, using a regular expression or search string.
      * @param searchValue A string to search for.
      * @param replaceValue A string containing the text to replace for every successful match of searchValue in this string.
      */
    replace(searchValue: string | RegExp, replaceValue: string): string;

    /**
      * Replaces text in a string, using a regular expression or search string.
      * @param searchValue A string to search for.
      * @param replacer A function that returns the replacement text.
      */
    replace(searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;

    /**
      * Finds the first substring match in a regular expression search.
      * @param regexp The regular expression pattern and applicable flags.
      */
    search(regexp: string | RegExp): number;

    /**
      * Returns a section of a string.
      * @param start The index to the beginning of the specified portion of stringObj.
      * @param end The index to the end of the specified portion of stringObj. The substring includes the characters up to, but not including, the character indicated by end.
      * If this value is not specified, the substring continues to the end of stringObj.
      */
    slice(start?: number, end?: number): string;

    /**
      * Split a string into substrings using the specified separator and return them as an array.
      * @param separator A string that identifies character or characters to use in separating the string. If omitted, a single-element array containing the entire string is returned.
      * @param limit A value used to limit the number of elements returned in the array.
      */
    split(separator: string | RegExp, limit?: number): string[];

    /**
      * Returns the substring at the specified location within a String object.
      * @param start The zero-based index number indicating the beginning of the substring.
      * @param end Zero-based index number indicating the end of the substring. The substring includes the characters up to, but not including, the character indicated by end.
      * If end is omitted, the characters from start through the end of the original string are returned.
      */
    substring(start: number, end?: number): string;

    /** Converts all the alphabetic characters in a string to lowercase. */
    toLowerCase(): string;

    /** Converts all alphabetic characters to lowercase, taking into account the host environment's current locale. */
    toLocaleLowerCase(): string;

    /** Converts all the alphabetic characters in a string to uppercase. */
    toUpperCase(): string;

    /** Returns a string where all alphabetic characters have been converted to uppercase, taking into account the host environment's current locale. */
    toLocaleUpperCase(): string;

    /** Removes the leading and trailing white space and line terminator characters from a string. */
    trim(): string;

    /** Returns the length of a String object. */
    readonly length: number;

    // IE extensions
    /**
      * Gets a substring beginning at the specified location and having the specified length.
      * @param from The starting position of the desired substring. The index of the first character in the string is zero.
      * @param length The number of characters to include in the returned substring.
      */
    substr(from: number, length?: number): string;

    /** Returns the primitive value of the specified object. */
    valueOf(): string;

    readonly [index: number]: string;
}

interface StringConstructor {
    new(value?: any): String;
    (value?: any): string;
    readonly prototype: String;
    fromCharCode(...codes: number[]): string;
}

/**
  * Allows manipulation and formatting of text strings and determination and location of substrings within strings.
  */
declare const String: StringConstructor;

interface Boolean {
    /** Returns the primitive value of the specified object. */
    valueOf(): boolean;
}

interface BooleanConstructor {
    new(value?: any): Boolean;
    (value?: any): boolean;
    readonly prototype: Boolean;
}

declare const Boolean: BooleanConstructor;

interface Number {
    /**
      * Returns a string representation of an object.
      * @param radix Specifies a radix for converting numeric values to strings. This value is only used for numbers.
      */
    toString(radix?: number): string;

    /**
      * Returns a string representing a number in fixed-point notation.
      * @param fractionDigits Number of digits after the decimal point. Must be in the range 0 - 20, inclusive.
      */
    toFixed(fractionDigits?: number): string;

    /**
      * Returns a string containing a number represented in exponential notation.
      * @param fractionDigits Number of digits after the decimal point. Must be in the range 0 - 20, inclusive.
      */
    toExponential(fractionDigits?: number): string;

    /**
      * Returns a string containing a number represented either in exponential or fixed-point notation with a specified number of digits.
      * @param precision Number of significant digits. Must be in the range 1 - 21, inclusive.
      */
    toPrecision(precision?: number): string;

    /** Returns the primitive value of the specified object. */
    valueOf(): number;
}

interface NumberConstructor {
    new(value?: any): Number;
    (value?: any): number;
    readonly prototype: Number;

    /** The largest number that can be represented in JavaScript. Equal to approximately 1.79E+308. */
    readonly MAX_VALUE: number;

    /** The closest number to zero that can be represented in JavaScript. Equal to approximately 5.00E-324. */
    readonly MIN_VALUE: number;

    /**
      * A value that is not a number.
      * In equality comparisons, NaN does not equal any value, including itself. To test whether a value is equivalent to NaN, use the isNaN function.
      */
    readonly NaN: number;

    /**
      * A value that is less than the largest negative number that can be represented in JavaScript.
      * JavaScript displays NEGATIVE_INFINITY values as -infinity.
      */
    readonly NEGATIVE_INFINITY: number;

    /**
      * A value greater than the largest number that can be represented in JavaScript.
      * JavaScript displays POSITIVE_INFINITY values as infinity.
      */
    readonly POSITIVE_INFINITY: number;
}

/** An object that represents a number of any kind. All JavaScript numbers are 64-bit floating-point numbers. */
declare const Number: NumberConstructor;

interface TemplateStringsArray extends ReadonlyArray<string> {
    readonly raw: ReadonlyArray<string>;
}

/**
 * The type of \`import.meta\`.
 *
 * If you need to declare that a given property exists on \`import.meta\`,
 * this type may be augmented via interface merging.
 */
interface ImportMeta {
}

interface Math {
    /** The mathematical constant e. This is Euler's number, the base of natural logarithms. */
    readonly E: number;
    /** The natural logarithm of 10. */
    readonly LN10: number;
    /** The natural logarithm of 2. */
    readonly LN2: number;
    /** The base-2 logarithm of e. */
    readonly LOG2E: number;
    /** The base-10 logarithm of e. */
    readonly LOG10E: number;
    /** Pi. This is the ratio of the circumference of a circle to its diameter. */
    readonly PI: number;
    /** The square root of 0.5, or, equivalently, one divided by the square root of 2. */
    readonly SQRT1_2: number;
    /** The square root of 2. */
    readonly SQRT2: number;
    /**
      * Returns the absolute value of a number (the value without regard to whether it is positive or negative).
      * For example, the absolute value of -5 is the same as the absolute value of 5.
      * @param x A numeric expression for which the absolute value is needed.
      */
    abs(x: number): number;
    /**
      * Returns the arc cosine (or inverse cosine) of a number.
      * @param x A numeric expression.
      */
    acos(x: number): number;
    /**
      * Returns the arcsine of a number.
      * @param x A numeric expression.
      */
    asin(x: number): number;
    /**
      * Returns the arctangent of a number.
      * @param x A numeric expression for which the arctangent is needed.
      */
    atan(x: number): number;
    /**
      * Returns the angle (in radians) from the X axis to a point.
      * @param y A numeric expression representing the cartesian y-coordinate.
      * @param x A numeric expression representing the cartesian x-coordinate.
      */
    atan2(y: number, x: number): number;
    /**
      * Returns the smallest integer greater than or equal to its numeric argument.
      * @param x A numeric expression.
      */
    ceil(x: number): number;
    /**
      * Returns the cosine of a number.
      * @param x A numeric expression that contains an angle measured in radians.
      */
    cos(x: number): number;
    /**
      * Returns e (the base of natural logarithms) raised to a power.
      * @param x A numeric expression representing the power of e.
      */
    exp(x: number): number;
    /**
      * Returns the greatest integer less than or equal to its numeric argument.
      * @param x A numeric expression.
      */
    floor(x: number): number;
    /**
      * Returns the natural logarithm (base e) of a number.
      * @param x A numeric expression.
      */
    log(x: number): number;
    /**
      * Returns the larger of a set of supplied numeric expressions.
      * @param values Numeric expressions to be evaluated.
      */
    max(...values: number[]): number;
    /**
      * Returns the smaller of a set of supplied numeric expressions.
      * @param values Numeric expressions to be evaluated.
      */
    min(...values: number[]): number;
    /**
      * Returns the value of a base expression taken to a specified power.
      * @param x The base value of the expression.
      * @param y The exponent value of the expression.
      */
    pow(x: number, y: number): number;
    /** Returns a pseudorandom number between 0 and 1. */
    random(): number;
    /**
      * Returns a supplied numeric expression rounded to the nearest number.
      * @param x The value to be rounded to the nearest number.
      */
    round(x: number): number;
    /**
      * Returns the sine of a number.
      * @param x A numeric expression that contains an angle measured in radians.
      */
    sin(x: number): number;
    /**
      * Returns the square root of a number.
      * @param x A numeric expression.
      */
    sqrt(x: number): number;
    /**
      * Returns the tangent of a number.
      * @param x A numeric expression that contains an angle measured in radians.
      */
    tan(x: number): number;
}
/** An intrinsic object that provides basic mathematics functionality and constants. */
declare const Math: Math;

/** Enables basic storage and retrieval of dates and times. */
interface Date {
    /** Returns a string representation of a date. The format of the string depends on the locale. */
    toString(): string;
    /** Returns a date as a string value. */
    toDateString(): string;
    /** Returns a time as a string value. */
    toTimeString(): string;
    /** Returns a value as a string value appropriate to the host environment's current locale. */
    toLocaleString(): string;
    /** Returns a date as a string value appropriate to the host environment's current locale. */
    toLocaleDateString(): string;
    /** Returns a time as a string value appropriate to the host environment's current locale. */
    toLocaleTimeString(): string;
    /** Returns the stored time value in milliseconds since midnight, January 1, 1970 UTC. */
    valueOf(): number;
    /** Gets the time value in milliseconds. */
    getTime(): number;
    /** Gets the year, using local time. */
    getFullYear(): number;
    /** Gets the year using Universal Coordinated Time (UTC). */
    getUTCFullYear(): number;
    /** Gets the month, using local time. */
    getMonth(): number;
    /** Gets the month of a Date object using Universal Coordinated Time (UTC). */
    getUTCMonth(): number;
    /** Gets the day-of-the-month, using local time. */
    getDate(): number;
    /** Gets the day-of-the-month, using Universal Coordinated Time (UTC). */
    getUTCDate(): number;
    /** Gets the day of the week, using local time. */
    getDay(): number;
    /** Gets the day of the week using Universal Coordinated Time (UTC). */
    getUTCDay(): number;
    /** Gets the hours in a date, using local time. */
    getHours(): number;
    /** Gets the hours value in a Date object using Universal Coordinated Time (UTC). */
    getUTCHours(): number;
    /** Gets the minutes of a Date object, using local time. */
    getMinutes(): number;
    /** Gets the minutes of a Date object using Universal Coordinated Time (UTC). */
    getUTCMinutes(): number;
    /** Gets the seconds of a Date object, using local time. */
    getSeconds(): number;
    /** Gets the seconds of a Date object using Universal Coordinated Time (UTC). */
    getUTCSeconds(): number;
    /** Gets the milliseconds of a Date, using local time. */
    getMilliseconds(): number;
    /** Gets the milliseconds of a Date object using Universal Coordinated Time (UTC). */
    getUTCMilliseconds(): number;
    /** Gets the difference in minutes between the time on the local computer and Universal Coordinated Time (UTC). */
    getTimezoneOffset(): number;
    /**
      * Sets the date and time value in the Date object.
      * @param time A numeric value representing the number of elapsed milliseconds since midnight, January 1, 1970 GMT.
      */
    setTime(time: number): number;
    /**
      * Sets the milliseconds value in the Date object using local time.
      * @param ms A numeric value equal to the millisecond value.
      */
    setMilliseconds(ms: number): number;
    /**
      * Sets the milliseconds value in the Date object using Universal Coordinated Time (UTC).
      * @param ms A numeric value equal to the millisecond value.
      */
    setUTCMilliseconds(ms: number): number;

    /**
      * Sets the seconds value in the Date object using local time.
      * @param sec A numeric value equal to the seconds value.
      * @param ms A numeric value equal to the milliseconds value.
      */
    setSeconds(sec: number, ms?: number): number;
    /**
      * Sets the seconds value in the Date object using Universal Coordinated Time (UTC).
      * @param sec A numeric value equal to the seconds value.
      * @param ms A numeric value equal to the milliseconds value.
      */
    setUTCSeconds(sec: number, ms?: number): number;
    /**
      * Sets the minutes value in the Date object using local time.
      * @param min A numeric value equal to the minutes value.
      * @param sec A numeric value equal to the seconds value.
      * @param ms A numeric value equal to the milliseconds value.
      */
    setMinutes(min: number, sec?: number, ms?: number): number;
    /**
      * Sets the minutes value in the Date object using Universal Coordinated Time (UTC).
      * @param min A numeric value equal to the minutes value.
      * @param sec A numeric value equal to the seconds value.
      * @param ms A numeric value equal to the milliseconds value.
      */
    setUTCMinutes(min: number, sec?: number, ms?: number): number;
    /**
      * Sets the hour value in the Date object using local time.
      * @param hours A numeric value equal to the hours value.
      * @param min A numeric value equal to the minutes value.
      * @param sec A numeric value equal to the seconds value.
      * @param ms A numeric value equal to the milliseconds value.
      */
    setHours(hours: number, min?: number, sec?: number, ms?: number): number;
    /**
      * Sets the hours value in the Date object using Universal Coordinated Time (UTC).
      * @param hours A numeric value equal to the hours value.
      * @param min A numeric value equal to the minutes value.
      * @param sec A numeric value equal to the seconds value.
      * @param ms A numeric value equal to the milliseconds value.
      */
    setUTCHours(hours: number, min?: number, sec?: number, ms?: number): number;
    /**
      * Sets the numeric day-of-the-month value of the Date object using local time.
      * @param date A numeric value equal to the day of the month.
      */
    setDate(date: number): number;
    /**
      * Sets the numeric day of the month in the Date object using Universal Coordinated Time (UTC).
      * @param date A numeric value equal to the day of the month.
      */
    setUTCDate(date: number): number;
    /**
      * Sets the month value in the Date object using local time.
      * @param month A numeric value equal to the month. The value for January is 0, and other month values follow consecutively.
      * @param date A numeric value representing the day of the month. If this value is not supplied, the value from a call to the getDate method is used.
      */
    setMonth(month: number, date?: number): number;
    /**
      * Sets the month value in the Date object using Universal Coordinated Time (UTC).
      * @param month A numeric value equal to the month. The value for January is 0, and other month values follow consecutively.
      * @param date A numeric value representing the day of the month. If it is not supplied, the value from a call to the getUTCDate method is used.
      */
    setUTCMonth(month: number, date?: number): number;
    /**
      * Sets the year of the Date object using local time.
      * @param year A numeric value for the year.
      * @param month A zero-based numeric value for the month (0 for January, 11 for December). Must be specified if numDate is specified.
      * @param date A numeric value equal for the day of the month.
      */
    setFullYear(year: number, month?: number, date?: number): number;
    /**
      * Sets the year value in the Date object using Universal Coordinated Time (UTC).
      * @param year A numeric value equal to the year.
      * @param month A numeric value equal to the month. The value for January is 0, and other month values follow consecutively. Must be supplied if numDate is supplied.
      * @param date A numeric value equal to the day of the month.
      */
    setUTCFullYear(year: number, month?: number, date?: number): number;
    /** Returns a date converted to a string using Universal Coordinated Time (UTC). */
    toUTCString(): string;
    /** Returns a date as a string value in ISO format. */
    toISOString(): string;
    /** Used by the JSON.stringify method to enable the transformation of an object's data for JavaScript Object Notation (JSON) serialization. */
    toJSON(key?: any): string;
}

interface DateConstructor {
    new(): Date;
    new(value: number | string): Date;
    new(year: number, month: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number): Date;
    (): string;
    readonly prototype: Date;
    /**
      * Parses a string containing a date, and returns the number of milliseconds between that date and midnight, January 1, 1970.
      * @param s A date string
      */
    parse(s: string): number;
    /**
      * Returns the number of milliseconds between midnight, January 1, 1970 Universal Coordinated Time (UTC) (or GMT) and the specified date.
      * @param year The full year designation is required for cross-century date accuracy. If year is between 0 and 99 is used, then year is assumed to be 1900 + year.
      * @param month The month as an number between 0 and 11 (January to December).
      * @param date The date as an number between 1 and 31.
      * @param hours Must be supplied if minutes is supplied. An number from 0 to 23 (midnight to 11pm) that specifies the hour.
      * @param minutes Must be supplied if seconds is supplied. An number from 0 to 59 that specifies the minutes.
      * @param seconds Must be supplied if milliseconds is supplied. An number from 0 to 59 that specifies the seconds.
      * @param ms An number from 0 to 999 that specifies the milliseconds.
      */
    UTC(year: number, month: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number): number;
    now(): number;
}

declare const Date: DateConstructor;

interface RegExpMatchArray extends Array<string> {
    index?: number;
    input?: string;
}

interface RegExpExecArray extends Array<string> {
    index: number;
    input: string;
}

interface RegExp {
    /**
      * Executes a search on a string using a regular expression pattern, and returns an array containing the results of that search.
      * @param string The String object or string literal on which to perform the search.
      */
    exec(string: string): RegExpExecArray | null;

    /**
      * Returns a Boolean value that indicates whether or not a pattern exists in a searched string.
      * @param string String on which to perform the search.
      */
    test(string: string): boolean;

    /** Returns a copy of the text of the regular expression pattern. Read-only. The regExp argument is a Regular expression object. It can be a variable name or a literal. */
    readonly source: string;

    /** Returns a Boolean value indicating the state of the global flag (g) used with a regular expression. Default is false. Read-only. */
    readonly global: boolean;

    /** Returns a Boolean value indicating the state of the ignoreCase flag (i) used with a regular expression. Default is false. Read-only. */
    readonly ignoreCase: boolean;

    /** Returns a Boolean value indicating the state of the multiline flag (m) used with a regular expression. Default is false. Read-only. */
    readonly multiline: boolean;

    lastIndex: number;

    // Non-standard extensions
    compile(): this;
}

interface RegExpConstructor {
    new(pattern: RegExp | string): RegExp;
    new(pattern: string, flags?: string): RegExp;
    (pattern: RegExp | string): RegExp;
    (pattern: string, flags?: string): RegExp;
    readonly prototype: RegExp;

    // Non-standard extensions
    $1: string;
    $2: string;
    $3: string;
    $4: string;
    $5: string;
    $6: string;
    $7: string;
    $8: string;
    $9: string;
    lastMatch: string;
}

declare const RegExp: RegExpConstructor;

interface Error {
    name: string;
    message: string;
    stack?: string;
}

interface ErrorConstructor {
    new(message?: string): Error;
    (message?: string): Error;
    readonly prototype: Error;
}

declare const Error: ErrorConstructor;

interface EvalError extends Error {
}

interface EvalErrorConstructor {
    new(message?: string): EvalError;
    (message?: string): EvalError;
    readonly prototype: EvalError;
}

declare const EvalError: EvalErrorConstructor;

interface RangeError extends Error {
}

interface RangeErrorConstructor {
    new(message?: string): RangeError;
    (message?: string): RangeError;
    readonly prototype: RangeError;
}

declare const RangeError: RangeErrorConstructor;

interface ReferenceError extends Error {
}

interface ReferenceErrorConstructor {
    new(message?: string): ReferenceError;
    (message?: string): ReferenceError;
    readonly prototype: ReferenceError;
}

declare const ReferenceError: ReferenceErrorConstructor;

interface SyntaxError extends Error {
}

interface SyntaxErrorConstructor {
    new(message?: string): SyntaxError;
    (message?: string): SyntaxError;
    readonly prototype: SyntaxError;
}

declare const SyntaxError: SyntaxErrorConstructor;

interface TypeError extends Error {
}

interface TypeErrorConstructor {
    new(message?: string): TypeError;
    (message?: string): TypeError;
    readonly prototype: TypeError;
}

declare const TypeError: TypeErrorConstructor;

interface URIError extends Error {
}

interface URIErrorConstructor {
    new(message?: string): URIError;
    (message?: string): URIError;
    readonly prototype: URIError;
}

declare const URIError: URIErrorConstructor;

interface JSON {
    /**
      * Converts a JavaScript Object Notation (JSON) string into an object.
      * @param text A valid JSON string.
      * @param reviver A function that transforms the results. This function is called for each member of the object.
      * If a member contains nested objects, the nested objects are transformed before the parent object is.
      */
    parse(text: string, reviver?: (this: any, key: string, value: any) => any): any;
    /**
      * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
      * @param value A JavaScript value, usually an object or array, to be converted.
      * @param replacer A function that transforms the results.
      * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
      */
    stringify(value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string;
    /**
      * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
      * @param value A JavaScript value, usually an object or array, to be converted.
      * @param replacer An array of strings and numbers that acts as a approved list for selecting the object properties that will be stringified.
      * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
      */
    stringify(value: any, replacer?: (number | string)[] | null, space?: string | number): string;
}

/**
  * An intrinsic object that provides functions to convert JavaScript values to and from the JavaScript Object Notation (JSON) format.
  */
declare const JSON: JSON;


/////////////////////////////
/// ECMAScript Array API (specially handled by compiler)
/////////////////////////////

interface ReadonlyArray<T> {
    /**
      * Gets the length of the array. This is a number one higher than the highest element defined in an array.
      */
    readonly length: number;
    /**
      * Returns a string representation of an array.
      */
    toString(): string;
    /**
      * Returns a string representation of an array. The elements are converted to string using their toLocalString methods.
      */
    toLocaleString(): string;
    /**
      * Combines two or more arrays.
      * @param items Additional items to add to the end of array1.
      */
    concat(...items: ConcatArray<T>[]): T[];
    /**
      * Combines two or more arrays.
      * @param items Additional items to add to the end of array1.
      */
    concat(...items: (T | ConcatArray<T>)[]): T[];
    /**
      * Adds all the elements of an array separated by the specified separator string.
      * @param separator A string used to separate one element of an array from the next in the resulting String. If omitted, the array elements are separated with a comma.
      */
    join(separator?: string): string;
    /**
      * Returns a section of an array.
      * @param start The beginning of the specified portion of the array.
      * @param end The end of the specified portion of the array.
      */
    slice(start?: number, end?: number): T[];
    /**
      * Returns the index of the first occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.
      */
    indexOf(searchElement: T, fromIndex?: number): number;
    /**
      * Returns the index of the last occurrence of a specified value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at the last index in the array.
      */
    lastIndexOf(searchElement: T, fromIndex?: number): number;
    /**
      * Determines whether all the members of an array satisfy the specified test.
      * @param callbackfn A function that accepts up to three arguments. The every method calls the callbackfn function for each element in array1 until the callbackfn returns false, or until the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
      */
    every(callbackfn: (value: T, index: number, array: ReadonlyArray<T>) => unknown, thisArg?: any): boolean;
    /**
      * Determines whether the specified callback function returns true for any element of an array.
      * @param callbackfn A function that accepts up to three arguments. The some method calls the callbackfn function for each element in array1 until the callbackfn returns true, or until the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
      */
    some(callbackfn: (value: T, index: number, array: ReadonlyArray<T>) => unknown, thisArg?: any): boolean;
    /**
      * Performs the specified action for each element in an array.
      * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
      * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
      */
    forEach(callbackfn: (value: T, index: number, array: ReadonlyArray<T>) => void, thisArg?: any): void;
    /**
      * Calls a defined callback function on each element of an array, and returns an array that contains the results.
      * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
      */
    map<U>(callbackfn: (value: T, index: number, array: ReadonlyArray<T>) => U, thisArg?: any): U[];
    /**
     * Returns the elements of an array that meet the condition specified in a callback function.
     * @param callbackfn A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    filter<S extends T>(callbackfn: (value: T, index: number, array: ReadonlyArray<T>) => value is S, thisArg?: any): S[];
    /**
      * Returns the elements of an array that meet the condition specified in a callback function.
      * @param callbackfn A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
      */
    filter(callbackfn: (value: T, index: number, array: ReadonlyArray<T>) => unknown, thisArg?: any): T[];
    /**
      * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
      */
    reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: ReadonlyArray<T>) => T): T;
    reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: ReadonlyArray<T>) => T, initialValue: T): T;
    /**
      * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
      */
    reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: ReadonlyArray<T>) => U, initialValue: U): U;
    /**
      * Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
      */
    reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: ReadonlyArray<T>) => T): T;
    reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: ReadonlyArray<T>) => T, initialValue: T): T;
    /**
      * Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
      */
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: ReadonlyArray<T>) => U, initialValue: U): U;

    readonly [n: number]: T;
}

interface ConcatArray<T> {
    readonly length: number;
    readonly [n: number]: T;
    join(separator?: string): string;
    slice(start?: number, end?: number): T[];
}

interface Array<T> {
    /**
      * Gets or sets the length of the array. This is a number one higher than the highest element defined in an array.
      */
    length: number;
    /**
      * Returns a string representation of an array.
      */
    toString(): string;
    /**
      * Returns a string representation of an array. The elements are converted to string using their toLocalString methods.
      */
    toLocaleString(): string;
    /**
      * Removes the last element from an array and returns it.
      */
    pop(): T | undefined;
    /**
      * Appends new elements to an array, and returns the new length of the array.
      * @param items New elements of the Array.
      */
    push(...items: T[]): number;
    /**
      * Combines two or more arrays.
      * @param items Additional items to add to the end of array1.
      */
    concat(...items: ConcatArray<T>[]): T[];
    /**
      * Combines two or more arrays.
      * @param items Additional items to add to the end of array1.
      */
    concat(...items: (T | ConcatArray<T>)[]): T[];
    /**
      * Adds all the elements of an array separated by the specified separator string.
      * @param separator A string used to separate one element of an array from the next in the resulting String. If omitted, the array elements are separated with a comma.
      */
    join(separator?: string): string;
    /**
      * Reverses the elements in an Array.
      */
    reverse(): T[];
    /**
      * Removes the first element from an array and returns it.
      */
    shift(): T | undefined;
    /**
      * Returns a section of an array.
      * @param start The beginning of the specified portion of the array.
      * @param end The end of the specified portion of the array.
      */
    slice(start?: number, end?: number): T[];
    /**
      * Sorts an array.
      * @param compareFn The name of the function used to determine the order of the elements. If omitted, the elements are sorted in ascending, ASCII character order.
      */
    sort(compareFn?: (a: T, b: T) => number): this;
    /**
      * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
      * @param start The zero-based location in the array from which to start removing elements.
      * @param deleteCount The number of elements to remove.
      */
    splice(start: number, deleteCount?: number): T[];
    /**
      * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
      * @param start The zero-based location in the array from which to start removing elements.
      * @param deleteCount The number of elements to remove.
      * @param items Elements to insert into the array in place of the deleted elements.
      */
    splice(start: number, deleteCount: number, ...items: T[]): T[];
    /**
      * Inserts new elements at the start of an array.
      * @param items  Elements to insert at the start of the Array.
      */
    unshift(...items: T[]): number;
    /**
      * Returns the index of the first occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.
      */
    indexOf(searchElement: T, fromIndex?: number): number;
    /**
      * Returns the index of the last occurrence of a specified value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at the last index in the array.
      */
    lastIndexOf(searchElement: T, fromIndex?: number): number;
    /**
      * Determines whether all the members of an array satisfy the specified test.
      * @param callbackfn A function that accepts up to three arguments. The every method calls the callbackfn function for each element in array1 until the callbackfn returns false, or until the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
      */
    every(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;
    /**
      * Determines whether the specified callback function returns true for any element of an array.
      * @param callbackfn A function that accepts up to three arguments. The some method calls the callbackfn function for each element in array1 until the callbackfn returns true, or until the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
      */
    some(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;
    /**
      * Performs the specified action for each element in an array.
      * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
      * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
      */
    forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
    /**
      * Calls a defined callback function on each element of an array, and returns an array that contains the results.
      * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
      */
    map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
    /**
     * Returns the elements of an array that meet the condition specified in a callback function.
     * @param callbackfn A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    filter<S extends T>(callbackfn: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[];
    /**
      * Returns the elements of an array that meet the condition specified in a callback function.
      * @param callbackfn A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
      */
    filter(callbackfn: (value: T, index: number, array: T[]) => any, thisArg?: any): T[];
    /**
      * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
      */
    reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
    reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
    /**
      * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
      */
    reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
    /**
      * Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
      */
    reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
    reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
    /**
      * Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
      */
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;

    [n: number]: T;
}

interface ArrayConstructor {
    new(arrayLength?: number): any[];
    new <T>(arrayLength: number): T[];
    new <T>(...items: T[]): T[];
    (arrayLength?: number): any[];
    <T>(arrayLength: number): T[];
    <T>(...items: T[]): T[];
    isArray(arg: any): arg is Array<any>;
    readonly prototype: Array<any>;
}

declare const Array: ArrayConstructor;

interface TypedPropertyDescriptor<T> {
    enumerable?: boolean;
    configurable?: boolean;
    writable?: boolean;
    value?: T;
    get?: () => T;
    set?: (value: T) => void;
}

declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;
declare type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
declare type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;

declare type PromiseConstructorLike = new <T>(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void) => PromiseLike<T>;

interface PromiseLike<T> {
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): PromiseLike<TResult1 | TResult2>;
}

/**
 * Represents the completion of an asynchronous operation
 */
interface Promise<T> {
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;

    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
}

interface ArrayLike<T> {
    readonly length: number;
    readonly [n: number]: T;
}

/**
 * Make all properties in T optional
 */
type Partial<T> = {
    [P in keyof T]?: T[P];
};

/**
 * Make all properties in T required
 */
type Required<T> = {
    [P in keyof T]-?: T[P];
};

/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

/**
 * Construct a type with a set of properties K of type T
 */
type Record<K extends keyof any, T> = {
    [P in K]: T;
};

/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T;

/**
 * Extract from T those types that are assignable to U
 */
type Extract<T, U> = T extends U ? T : never;

/**
 * Exclude null and undefined from T
 */
type NonNullable<T> = T extends null | undefined ? never : T;

/**
 * Obtain the parameters of a function type in a tuple
 */
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

/**
 * Obtain the parameters of a constructor function type in a tuple
 */
type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never;

/**
 * Obtain the return type of a function type
 */
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

/**
 * Obtain the return type of a constructor function type
 */
type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any;

/**
 * Marker for contextual 'this' type
 */
interface ThisType<T> { }

/**
  * Represents a raw buffer of binary data, which is used to store data for the
  * different typed arrays. ArrayBuffers cannot be read from or written to directly,
  * but can be passed to a typed array or DataView Object to interpret the raw
  * buffer as needed.
  */
interface ArrayBuffer {
    /**
      * Read-only. The length of the ArrayBuffer (in bytes).
      */
    readonly byteLength: number;

    /**
      * Returns a section of an ArrayBuffer.
      */
    slice(begin: number, end?: number): ArrayBuffer;
}

/**
 * Allowed ArrayBuffer types for the buffer of an ArrayBufferView and related Typed Arrays.
 */
interface ArrayBufferTypes {
    ArrayBuffer: ArrayBuffer;
}
type ArrayBufferLike = ArrayBufferTypes[keyof ArrayBufferTypes];

interface ArrayBufferConstructor {
    readonly prototype: ArrayBuffer;
    new(byteLength: number): ArrayBuffer;
    isView(arg: any): arg is ArrayBufferView;
}
declare const ArrayBuffer: ArrayBufferConstructor;

interface ArrayBufferView {
    /**
      * The ArrayBuffer instance referenced by the array.
      */
    buffer: ArrayBufferLike;

    /**
      * The length in bytes of the array.
      */
    byteLength: number;

    /**
      * The offset in bytes of the array.
      */
    byteOffset: number;
}

interface DataView {
    readonly buffer: ArrayBuffer;
    readonly byteLength: number;
    readonly byteOffset: number;
    /**
      * Gets the Float32 value at the specified byte offset from the start of the view. There is
      * no alignment constraint; multi-byte values may be fetched from any offset.
      * @param byteOffset The place in the buffer at which the value should be retrieved.
      */
    getFloat32(byteOffset: number, littleEndian?: boolean): number;

    /**
      * Gets the Float64 value at the specified byte offset from the start of the view. There is
      * no alignment constraint; multi-byte values may be fetched from any offset.
      * @param byteOffset The place in the buffer at which the value should be retrieved.
      */
    getFloat64(byteOffset: number, littleEndian?: boolean): number;

    /**
      * Gets the Int8 value at the specified byte offset from the start of the view. There is
      * no alignment constraint; multi-byte values may be fetched from any offset.
      * @param byteOffset The place in the buffer at which the value should be retrieved.
      */
    getInt8(byteOffset: number): number;

    /**
      * Gets the Int16 value at the specified byte offset from the start of the view. There is
      * no alignment constraint; multi-byte values may be fetched from any offset.
      * @param byteOffset The place in the buffer at which the value should be retrieved.
      */
    getInt16(byteOffset: number, littleEndian?: boolean): number;
    /**
      * Gets the Int32 value at the specified byte offset from the start of the view. There is
      * no alignment constraint; multi-byte values may be fetched from any offset.
      * @param byteOffset The place in the buffer at which the value should be retrieved.
      */
    getInt32(byteOffset: number, littleEndian?: boolean): number;

    /**
      * Gets the Uint8 value at the specified byte offset from the start of the view. There is
      * no alignment constraint; multi-byte values may be fetched from any offset.
      * @param byteOffset The place in the buffer at which the value should be retrieved.
      */
    getUint8(byteOffset: number): number;

    /**
      * Gets the Uint16 value at the specified byte offset from the start of the view. There is
      * no alignment constraint; multi-byte values may be fetched from any offset.
      * @param byteOffset The place in the buffer at which the value should be retrieved.
      */
    getUint16(byteOffset: number, littleEndian?: boolean): number;

    /**
      * Gets the Uint32 value at the specified byte offset from the start of the view. There is
      * no alignment constraint; multi-byte values may be fetched from any offset.
      * @param byteOffset The place in the buffer at which the value should be retrieved.
      */
    getUint32(byteOffset: number, littleEndian?: boolean): number;

    /**
      * Stores an Float32 value at the specified byte offset from the start of the view.
      * @param byteOffset The place in the buffer at which the value should be set.
      * @param value The value to set.
      * @param littleEndian If false or undefined, a big-endian value should be written,
      * otherwise a little-endian value should be written.
      */
    setFloat32(byteOffset: number, value: number, littleEndian?: boolean): void;

    /**
      * Stores an Float64 value at the specified byte offset from the start of the view.
      * @param byteOffset The place in the buffer at which the value should be set.
      * @param value The value to set.
      * @param littleEndian If false or undefined, a big-endian value should be written,
      * otherwise a little-endian value should be written.
      */
    setFloat64(byteOffset: number, value: number, littleEndian?: boolean): void;

    /**
      * Stores an Int8 value at the specified byte offset from the start of the view.
      * @param byteOffset The place in the buffer at which the value should be set.
      * @param value The value to set.
      */
    setInt8(byteOffset: number, value: number): void;

    /**
      * Stores an Int16 value at the specified byte offset from the start of the view.
      * @param byteOffset The place in the buffer at which the value should be set.
      * @param value The value to set.
      * @param littleEndian If false or undefined, a big-endian value should be written,
      * otherwise a little-endian value should be written.
      */
    setInt16(byteOffset: number, value: number, littleEndian?: boolean): void;

    /**
      * Stores an Int32 value at the specified byte offset from the start of the view.
      * @param byteOffset The place in the buffer at which the value should be set.
      * @param value The value to set.
      * @param littleEndian If false or undefined, a big-endian value should be written,
      * otherwise a little-endian value should be written.
      */
    setInt32(byteOffset: number, value: number, littleEndian?: boolean): void;

    /**
      * Stores an Uint8 value at the specified byte offset from the start of the view.
      * @param byteOffset The place in the buffer at which the value should be set.
      * @param value The value to set.
      */
    setUint8(byteOffset: number, value: number): void;

    /**
      * Stores an Uint16 value at the specified byte offset from the start of the view.
      * @param byteOffset The place in the buffer at which the value should be set.
      * @param value The value to set.
      * @param littleEndian If false or undefined, a big-endian value should be written,
      * otherwise a little-endian value should be written.
      */
    setUint16(byteOffset: number, value: number, littleEndian?: boolean): void;

    /**
      * Stores an Uint32 value at the specified byte offset from the start of the view.
      * @param byteOffset The place in the buffer at which the value should be set.
      * @param value The value to set.
      * @param littleEndian If false or undefined, a big-endian value should be written,
      * otherwise a little-endian value should be written.
      */
    setUint32(byteOffset: number, value: number, littleEndian?: boolean): void;
}

interface DataViewConstructor {
    new(buffer: ArrayBufferLike, byteOffset?: number, byteLength?: number): DataView;
}
declare const DataView: DataViewConstructor;

/**
  * A typed array of 8-bit integer values. The contents are initialized to 0. If the requested
  * number of bytes could not be allocated an exception is raised.
  */
interface Int8Array {
    /**
      * The size in bytes of each element in the array.
      */
    readonly BYTES_PER_ELEMENT: number;

    /**
      * The ArrayBuffer instance referenced by the array.
      */
    readonly buffer: ArrayBufferLike;

    /**
      * The length in bytes of the array.
      */
    readonly byteLength: number;

    /**
      * The offset in bytes of the array.
      */
    readonly byteOffset: number;

    /**
      * Returns the this object after copying a section of the array identified by start and end
      * to the same array starting at position target
      * @param target If target is negative, it is treated as length+target where length is the
      * length of the array.
      * @param start If start is negative, it is treated as length+start. If end is negative, it
      * is treated as length+end.
      * @param end If not specified, length of the this object is used as its default value.
      */
    copyWithin(target: number, start: number, end?: number): this;

    /**
      * Determines whether all the members of an array satisfy the specified test.
      * @param callbackfn A function that accepts up to three arguments. The every method calls
      * the callbackfn function for each element in array1 until the callbackfn returns false,
      * or until the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    every(callbackfn: (value: number, index: number, array: Int8Array) => boolean, thisArg?: any): boolean;

    /**
        * Returns the this object after filling the section identified by start and end with value
        * @param value value to fill array section with
        * @param start index to start filling the array at. If start is negative, it is treated as
        * length+start where length is the length of the array.
        * @param end index to stop filling the array at. If end is negative, it is treated as
        * length+end.
        */
    fill(value: number, start?: number, end?: number): this;

    /**
      * Returns the elements of an array that meet the condition specified in a callback function.
      * @param callbackfn A function that accepts up to three arguments. The filter method calls
      * the callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    filter(callbackfn: (value: number, index: number, array: Int8Array) => any, thisArg?: any): Int8Array;

    /**
      * Returns the value of the first element in the array where predicate is true, and undefined
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending
      * order, until it finds one where predicate returns true. If such an element is found, find
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of
      * predicate. If it is not provided, undefined is used instead.
      */
    find(predicate: (value: number, index: number, obj: Int8Array) => boolean, thisArg?: any): number | undefined;

    /**
      * Returns the index of the first element in the array where predicate is true, and -1
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending
      * order, until it finds one where predicate returns true. If such an element is found,
      * findIndex immediately returns that element index. Otherwise, findIndex returns -1.
      * @param thisArg If provided, it will be used as the this value for each invocation of
      * predicate. If it is not provided, undefined is used instead.
      */
    findIndex(predicate: (value: number, index: number, obj: Int8Array) => boolean, thisArg?: any): number;

    /**
      * Performs the specified action for each element in an array.
      * @param callbackfn  A function that accepts up to three arguments. forEach calls the
      * callbackfn function one time for each element in the array.
      * @param thisArg  An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    forEach(callbackfn: (value: number, index: number, array: Int8Array) => void, thisArg?: any): void;

    /**
      * Returns the index of the first occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      *  search starts at index 0.
      */
    indexOf(searchElement: number, fromIndex?: number): number;

    /**
      * Adds all the elements of an array separated by the specified separator string.
      * @param separator A string used to separate one element of an array from the next in the
      * resulting String. If omitted, the array elements are separated with a comma.
      */
    join(separator?: string): string;

    /**
      * Returns the index of the last occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      * search starts at index 0.
      */
    lastIndexOf(searchElement: number, fromIndex?: number): number;

    /**
      * The length of the array.
      */
    readonly length: number;

    /**
      * Calls a defined callback function on each element of an array, and returns an array that
      * contains the results.
      * @param callbackfn A function that accepts up to three arguments. The map method calls the
      * callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    map(callbackfn: (value: number, index: number, array: Int8Array) => number, thisArg?: any): Int8Array;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of
      * the callback function is the accumulated result, and is provided as an argument in the next
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int8Array) => number): number;
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int8Array) => number, initialValue: number): number;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of
      * the callback function is the accumulated result, and is provided as an argument in the next
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Int8Array) => U, initialValue: U): U;

    /**
      * Calls the specified callback function for all the elements in an array, in descending order.
      * The return value of the callback function is the accumulated result, and is provided as an
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an
      * argument instead of an array value.
      */
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int8Array) => number): number;
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int8Array) => number, initialValue: number): number;

    /**
      * Calls the specified callback function for all the elements in an array, in descending order.
      * The return value of the callback function is the accumulated result, and is provided as an
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Int8Array) => U, initialValue: U): U;

    /**
      * Reverses the elements in an Array.
      */
    reverse(): Int8Array;

    /**
      * Sets a value or an array of values.
      * @param array A typed or untyped array of values to set.
      * @param offset The index in the current array at which the values are to be written.
      */
    set(array: ArrayLike<number>, offset?: number): void;

    /**
      * Returns a section of an array.
      * @param start The beginning of the specified portion of the array.
      * @param end The end of the specified portion of the array.
      */
    slice(start?: number, end?: number): Int8Array;

    /**
      * Determines whether the specified callback function returns true for any element of an array.
      * @param callbackfn A function that accepts up to three arguments. The some method calls the
      * callbackfn function for each element in array1 until the callbackfn returns true, or until
      * the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    some(callbackfn: (value: number, index: number, array: Int8Array) => boolean, thisArg?: any): boolean;

    /**
      * Sorts an array.
      * @param compareFn The name of the function used to determine the order of the elements. If
      * omitted, the elements are sorted in ascending, ASCII character order.
      */
    sort(compareFn?: (a: number, b: number) => number): this;

    /**
      * Gets a new Int8Array view of the ArrayBuffer store for this array, referencing the elements
      * at begin, inclusive, up to end, exclusive.
      * @param begin The index of the beginning of the array.
      * @param end The index of the end of the array.
      */
    subarray(begin: number, end?: number): Int8Array;

    /**
      * Converts a number to a string by using the current locale.
      */
    toLocaleString(): string;

    /**
      * Returns a string representation of an array.
      */
    toString(): string;

    [index: number]: number;
}
interface Int8ArrayConstructor {
    readonly prototype: Int8Array;
    new(length: number): Int8Array;
    new(arrayOrArrayBuffer: ArrayLike<number> | ArrayBufferLike): Int8Array;
    new(buffer: ArrayBufferLike, byteOffset: number, length?: number): Int8Array;

    /**
      * The size in bytes of each element in the array.
      */
    readonly BYTES_PER_ELEMENT: number;

    /**
      * Returns a new array from a set of elements.
      * @param items A set of elements to include in the new array object.
      */
    of(...items: number[]): Int8Array;

    /**
      * Creates an array from an array-like or iterable object.
      * @param arrayLike An array-like or iterable object to convert to an array.
      */
    from(arrayLike: ArrayLike<number>): Int8Array;

    /**
      * Creates an array from an array-like or iterable object.
      * @param arrayLike An array-like or iterable object to convert to an array.
      * @param mapfn A mapping function to call on every element of the array.
      * @param thisArg Value of 'this' used to invoke the mapfn.
      */
    from<T>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => number, thisArg?: any): Int8Array;


}
declare const Int8Array: Int8ArrayConstructor;

/**
  * A typed array of 8-bit unsigned integer values. The contents are initialized to 0. If the
  * requested number of bytes could not be allocated an exception is raised.
  */
interface Uint8Array {
    /**
      * The size in bytes of each element in the array.
      */
    readonly BYTES_PER_ELEMENT: number;

    /**
      * The ArrayBuffer instance referenced by the array.
      */
    readonly buffer: ArrayBufferLike;

    /**
      * The length in bytes of the array.
      */
    readonly byteLength: number;

    /**
      * The offset in bytes of the array.
      */
    readonly byteOffset: number;

    /**
      * Returns the this object after copying a section of the array identified by start and end
      * to the same array starting at position target
      * @param target If target is negative, it is treated as length+target where length is the
      * length of the array.
      * @param start If start is negative, it is treated as length+start. If end is negative, it
      * is treated as length+end.
      * @param end If not specified, length of the this object is used as its default value.
      */
    copyWithin(target: number, start: number, end?: number): this;

    /**
      * Determines whether all the members of an array satisfy the specified test.
      * @param callbackfn A function that accepts up to three arguments. The every method calls
      * the callbackfn function for each element in array1 until the callbackfn returns false,
      * or until the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    every(callbackfn: (value: number, index: number, array: Uint8Array) => boolean, thisArg?: any): boolean;

    /**
        * Returns the this object after filling the section identified by start and end with value
        * @param value value to fill array section with
        * @param start index to start filling the array at. If start is negative, it is treated as
        * length+start where length is the length of the array.
        * @param end index to stop filling the array at. If end is negative, it is treated as
        * length+end.
        */
    fill(value: number, start?: number, end?: number): this;

    /**
      * Returns the elements of an array that meet the condition specified in a callback function.
      * @param callbackfn A function that accepts up to three arguments. The filter method calls
      * the callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    filter(callbackfn: (value: number, index: number, array: Uint8Array) => any, thisArg?: any): Uint8Array;

    /**
      * Returns the value of the first element in the array where predicate is true, and undefined
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending
      * order, until it finds one where predicate returns true. If such an element is found, find
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of
      * predicate. If it is not provided, undefined is used instead.
      */
    find(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number | undefined;

    /**
      * Returns the index of the first element in the array where predicate is true, and -1
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending
      * order, until it finds one where predicate returns true. If such an element is found,
      * findIndex immediately returns that element index. Otherwise, findIndex returns -1.
      * @param thisArg If provided, it will be used as the this value for each invocation of
      * predicate. If it is not provided, undefined is used instead.
      */
    findIndex(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number;

    /**
      * Performs the specified action for each element in an array.
      * @param callbackfn  A function that accepts up to three arguments. forEach calls the
      * callbackfn function one time for each element in the array.
      * @param thisArg  An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    forEach(callbackfn: (value: number, index: number, array: Uint8Array) => void, thisArg?: any): void;

    /**
      * Returns the index of the first occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      *  search starts at index 0.
      */
    indexOf(searchElement: number, fromIndex?: number): number;

    /**
      * Adds all the elements of an array separated by the specified separator string.
      * @param separator A string used to separate one element of an array from the next in the
      * resulting String. If omitted, the array elements are separated with a comma.
      */
    join(separator?: string): string;

    /**
      * Returns the index of the last occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      * search starts at index 0.
      */
    lastIndexOf(searchElement: number, fromIndex?: number): number;

    /**
      * The length of the array.
      */
    readonly length: number;

    /**
      * Calls a defined callback function on each element of an array, and returns an array that
      * contains the results.
      * @param callbackfn A function that accepts up to three arguments. The map method calls the
      * callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    map(callbackfn: (value: number, index: number, array: Uint8Array) => number, thisArg?: any): Uint8Array;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of
      * the callback function is the accumulated result, and is provided as an argument in the next
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of
      * the callback function is the accumulated result, and is provided as an argument in the next
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;

    /**
      * Calls the specified callback function for all the elements in an array, in descending order.
      * The return value of the callback function is the accumulated result, and is provided as an
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an
      * argument instead of an array value.
      */
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;

    /**
      * Calls the specified callback function for all the elements in an array, in descending order.
      * The return value of the callback function is the accumulated result, and is provided as an
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;

    /**
      * Reverses the elements in an Array.
      */
    reverse(): Uint8Array;

    /**
      * Sets a value or an array of values.
      * @param array A typed or untyped array of values to set.
      * @param offset The index in the current array at which the values are to be written.
      */
    set(array: ArrayLike<number>, offset?: number): void;

    /**
      * Returns a section of an array.
      * @param start The beginning of the specified portion of the array.
      * @param end The end of the specified portion of the array.
      */
    slice(start?: number, end?: number): Uint8Array;

    /**
      * Determines whether the specified callback function returns true for any element of an array.
      * @param callbackfn A function that accepts up to three arguments. The some method calls the
      * callbackfn function for each element in array1 until the callbackfn returns true, or until
      * the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    some(callbackfn: (value: number, index: number, array: Uint8Array) => boolean, thisArg?: any): boolean;

    /**
      * Sorts an array.
      * @param compareFn The name of the function used to determine the order of the elements. If
      * omitted, the elements are sorted in ascending, ASCII character order.
      */
    sort(compareFn?: (a: number, b: number) => number): this;

    /**
      * Gets a new Uint8Array view of the ArrayBuffer store for this array, referencing the elements
      * at begin, inclusive, up to end, exclusive.
      * @param begin The index of the beginning of the array.
      * @param end The index of the end of the array.
      */
    subarray(begin: number, end?: number): Uint8Array;

    /**
      * Converts a number to a string by using the current locale.
      */
    toLocaleString(): string;

    /**
      * Returns a string representation of an array.
      */
    toString(): string;

    [index: number]: number;
}

interface Uint8ArrayConstructor {
    readonly prototype: Uint8Array;
    new(length: number): Uint8Array;
    new(arrayOrArrayBuffer: ArrayLike<number> | ArrayBufferLike): Uint8Array;
    new(buffer: ArrayBufferLike, byteOffset: number, length?: number): Uint8Array;

    /**
      * The size in bytes of each element in the array.
      */
    readonly BYTES_PER_ELEMENT: number;

    /**
      * Returns a new array from a set of elements.
      * @param items A set of elements to include in the new array object.
      */
    of(...items: number[]): Uint8Array;

    /**
      * Creates an array from an array-like or iterable object.
      * @param arrayLike An array-like or iterable object to convert to an array.
      */
    from(arrayLike: ArrayLike<number>): Uint8Array;

    /**
      * Creates an array from an array-like or iterable object.
      * @param arrayLike An array-like or iterable object to convert to an array.
      * @param mapfn A mapping function to call on every element of the array.
      * @param thisArg Value of 'this' used to invoke the mapfn.
      */
    from<T>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => number, thisArg?: any): Uint8Array;

}
declare const Uint8Array: Uint8ArrayConstructor;

/**
  * A typed array of 8-bit unsigned integer (clamped) values. The contents are initialized to 0.
  * If the requested number of bytes could not be allocated an exception is raised.
  */
interface Uint8ClampedArray {
    /**
      * The size in bytes of each element in the array.
      */
    readonly BYTES_PER_ELEMENT: number;

    /**
      * The ArrayBuffer instance referenced by the array.
      */
    readonly buffer: ArrayBufferLike;

    /**
      * The length in bytes of the array.
      */
    readonly byteLength: number;

    /**
      * The offset in bytes of the array.
      */
    readonly byteOffset: number;

    /**
      * Returns the this object after copying a section of the array identified by start and end
      * to the same array starting at position target
      * @param target If target is negative, it is treated as length+target where length is the
      * length of the array.
      * @param start If start is negative, it is treated as length+start. If end is negative, it
      * is treated as length+end.
      * @param end If not specified, length of the this object is used as its default value.
      */
    copyWithin(target: number, start: number, end?: number): this;

    /**
      * Determines whether all the members of an array satisfy the specified test.
      * @param callbackfn A function that accepts up to three arguments. The every method calls
      * the callbackfn function for each element in array1 until the callbackfn returns false,
      * or until the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    every(callbackfn: (value: number, index: number, array: Uint8ClampedArray) => boolean, thisArg?: any): boolean;

    /**
        * Returns the this object after filling the section identified by start and end with value
        * @param value value to fill array section with
        * @param start index to start filling the array at. If start is negative, it is treated as
        * length+start where length is the length of the array.
        * @param end index to stop filling the array at. If end is negative, it is treated as
        * length+end.
        */
    fill(value: number, start?: number, end?: number): this;

    /**
      * Returns the elements of an array that meet the condition specified in a callback function.
      * @param callbackfn A function that accepts up to three arguments. The filter method calls
      * the callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    filter(callbackfn: (value: number, index: number, array: Uint8ClampedArray) => any, thisArg?: any): Uint8ClampedArray;

    /**
      * Returns the value of the first element in the array where predicate is true, and undefined
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending
      * order, until it finds one where predicate returns true. If such an element is found, find
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of
      * predicate. If it is not provided, undefined is used instead.
      */
    find(predicate: (value: number, index: number, obj: Uint8ClampedArray) => boolean, thisArg?: any): number | undefined;

    /**
      * Returns the index of the first element in the array where predicate is true, and -1
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending
      * order, until it finds one where predicate returns true. If such an element is found,
      * findIndex immediately returns that element index. Otherwise, findIndex returns -1.
      * @param thisArg If provided, it will be used as the this value for each invocation of
      * predicate. If it is not provided, undefined is used instead.
      */
    findIndex(predicate: (value: number, index: number, obj: Uint8ClampedArray) => boolean, thisArg?: any): number;

    /**
      * Performs the specified action for each element in an array.
      * @param callbackfn  A function that accepts up to three arguments. forEach calls the
      * callbackfn function one time for each element in the array.
      * @param thisArg  An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    forEach(callbackfn: (value: number, index: number, array: Uint8ClampedArray) => void, thisArg?: any): void;

    /**
      * Returns the index of the first occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      *  search starts at index 0.
      */
    indexOf(searchElement: number, fromIndex?: number): number;

    /**
      * Adds all the elements of an array separated by the specified separator string.
      * @param separator A string used to separate one element of an array from the next in the
      * resulting String. If omitted, the array elements are separated with a comma.
      */
    join(separator?: string): string;

    /**
      * Returns the index of the last occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      * search starts at index 0.
      */
    lastIndexOf(searchElement: number, fromIndex?: number): number;

    /**
      * The length of the array.
      */
    readonly length: number;

    /**
      * Calls a defined callback function on each element of an array, and returns an array that
      * contains the results.
      * @param callbackfn A function that accepts up to three arguments. The map method calls the
      * callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    map(callbackfn: (value: number, index: number, array: Uint8ClampedArray) => number, thisArg?: any): Uint8ClampedArray;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of
      * the callback function is the accumulated result, and is provided as an argument in the next
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8ClampedArray) => number): number;
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8ClampedArray) => number, initialValue: number): number;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of
      * the callback function is the accumulated result, and is provided as an argument in the next
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8ClampedArray) => U, initialValue: U): U;

    /**
      * Calls the specified callback function for all the elements in an array, in descending order.
      * The return value of the callback function is the accumulated result, and is provided as an
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an
      * argument instead of an array value.
      */
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8ClampedArray) => number): number;
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8ClampedArray) => number, initialValue: number): number;

    /**
      * Calls the specified callback function for all the elements in an array, in descending order.
      * The return value of the callback function is the accumulated result, and is provided as an
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8ClampedArray) => U, initialValue: U): U;

    /**
      * Reverses the elements in an Array.
      */
    reverse(): Uint8ClampedArray;

    /**
      * Sets a value or an array of values.
      * @param array A typed or untyped array of values to set.
      * @param offset The index in the current array at which the values are to be written.
      */
    set(array: ArrayLike<number>, offset?: number): void;

    /**
      * Returns a section of an array.
      * @param start The beginning of the specified portion of the array.
      * @param end The end of the specified portion of the array.
      */
    slice(start?: number, end?: number): Uint8ClampedArray;

    /**
      * Determines whether the specified callback function returns true for any element of an array.
      * @param callbackfn A function that accepts up to three arguments. The some method calls the
      * callbackfn function for each element in array1 until the callbackfn returns true, or until
      * the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    some(callbackfn: (value: number, index: number, array: Uint8ClampedArray) => boolean, thisArg?: any): boolean;

    /**
      * Sorts an array.
      * @param compareFn The name of the function used to determine the order of the elements. If
      * omitted, the elements are sorted in ascending, ASCII character order.
      */
    sort(compareFn?: (a: number, b: number) => number): this;

    /**
      * Gets a new Uint8ClampedArray view of the ArrayBuffer store for this array, referencing the elements
      * at begin, inclusive, up to end, exclusive.
      * @param begin The index of the beginning of the array.
      * @param end The index of the end of the array.
      */
    subarray(begin: number, end?: number): Uint8ClampedArray;

    /**
      * Converts a number to a string by using the current locale.
      */
    toLocaleString(): string;

    /**
      * Returns a string representation of an array.
      */
    toString(): string;

    [index: number]: number;
}

interface Uint8ClampedArrayConstructor {
    readonly prototype: Uint8ClampedArray;
    new(length: number): Uint8ClampedArray;
    new(arrayOrArrayBuffer: ArrayLike<number> | ArrayBufferLike): Uint8ClampedArray;
    new(buffer: ArrayBufferLike, byteOffset: number, length?: number): Uint8ClampedArray;

    /**
      * The size in bytes of each element in the array.
      */
    readonly BYTES_PER_ELEMENT: number;

    /**
      * Returns a new array from a set of elements.
      * @param items A set of elements to include in the new array object.
      */
    of(...items: number[]): Uint8ClampedArray;

    /**
      * Creates an array from an array-like or iterable object.
      * @param arrayLike An array-like or iterable object to convert to an array.
      */
    from(arrayLike: ArrayLike<number>): Uint8ClampedArray;

    /**
      * Creates an array from an array-like or iterable object.
      * @param arrayLike An array-like or iterable object to convert to an array.
      * @param mapfn A mapping function to call on every element of the array.
      * @param thisArg Value of 'this' used to invoke the mapfn.
      */
    from<T>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => number, thisArg?: any): Uint8ClampedArray;
}
declare const Uint8ClampedArray: Uint8ClampedArrayConstructor;

/**
  * A typed array of 16-bit signed integer values. The contents are initialized to 0. If the
  * requested number of bytes could not be allocated an exception is raised.
  */
interface Int16Array {
    /**
      * The size in bytes of each element in the array.
      */
    readonly BYTES_PER_ELEMENT: number;

    /**
      * The ArrayBuffer instance referenced by the array.
      */
    readonly buffer: ArrayBufferLike;

    /**
      * The length in bytes of the array.
      */
    readonly byteLength: number;

    /**
      * The offset in bytes of the array.
      */
    readonly byteOffset: number;

    /**
      * Returns the this object after copying a section of the array identified by start and end
      * to the same array starting at position target
      * @param target If target is negative, it is treated as length+target where length is the
      * length of the array.
      * @param start If start is negative, it is treated as length+start. If end is negative, it
      * is treated as length+end.
      * @param end If not specified, length of the this object is used as its default value.
      */
    copyWithin(target: number, start: number, end?: number): this;

    /**
      * Determines whether all the members of an array satisfy the specified test.
      * @param callbackfn A function that accepts up to three arguments. The every method calls
      * the callbackfn function for each element in array1 until the callbackfn returns false,
      * or until the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    every(callbackfn: (value: number, index: number, array: Int16Array) => boolean, thisArg?: any): boolean;

    /**
        * Returns the this object after filling the section identified by start and end with value
        * @param value value to fill array section with
        * @param start index to start filling the array at. If start is negative, it is treated as
        * length+start where length is the length of the array.
        * @param end index to stop filling the array at. If end is negative, it is treated as
        * length+end.
        */
    fill(value: number, start?: number, end?: number): this;

    /**
      * Returns the elements of an array that meet the condition specified in a callback function.
      * @param callbackfn A function that accepts up to three arguments. The filter method calls
      * the callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    filter(callbackfn: (value: number, index: number, array: Int16Array) => any, thisArg?: any): Int16Array;

    /**
      * Returns the value of the first element in the array where predicate is true, and undefined
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending
      * order, until it finds one where predicate returns true. If such an element is found, find
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of
      * predicate. If it is not provided, undefined is used instead.
      */
    find(predicate: (value: number, index: number, obj: Int16Array) => boolean, thisArg?: any): number | undefined;

    /**
      * Returns the index of the first element in the array where predicate is true, and -1
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending
      * order, until it finds one where predicate returns true. If such an element is found,
      * findIndex immediately returns that element index. Otherwise, findIndex returns -1.
      * @param thisArg If provided, it will be used as the this value for each invocation of
      * predicate. If it is not provided, undefined is used instead.
      */
    findIndex(predicate: (value: number, index: number, obj: Int16Array) => boolean, thisArg?: any): number;

    /**
      * Performs the specified action for each element in an array.
      * @param callbackfn  A function that accepts up to three arguments. forEach calls the
      * callbackfn function one time for each element in the array.
      * @param thisArg  An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    forEach(callbackfn: (value: number, index: number, array: Int16Array) => void, thisArg?: any): void;
    /**
      * Returns the index of the first occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      *  search starts at index 0.
      */
    indexOf(searchElement: number, fromIndex?: number): number;

    /**
      * Adds all the elements of an array separated by the specified separator string.
      * @param separator A string used to separate one element of an array from the next in the
      * resulting String. If omitted, the array elements are separated with a comma.
      */
    join(separator?: string): string;

    /**
      * Returns the index of the last occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      * search starts at index 0.
      */
    lastIndexOf(searchElement: number, fromIndex?: number): number;

    /**
      * The length of the array.
      */
    readonly length: number;

    /**
      * Calls a defined callback function on each element of an array, and returns an array that
      * contains the results.
      * @param callbackfn A function that accepts up to three arguments. The map method calls the
      * callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    map(callbackfn: (value: number, index: number, array: Int16Array) => number, thisArg?: any): Int16Array;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of
      * the callback function is the accumulated result, and is provided as an argument in the next
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int16Array) => number): number;
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int16Array) => number, initialValue: number): number;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of
      * the callback function is the accumulated result, and is provided as an argument in the next
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Int16Array) => U, initialValue: U): U;

    /**
      * Calls the specified callback function for all the elements in an array, in descending order.
      * The return value of the callback function is the accumulated result, and is provided as an
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an
      * argument instead of an array value.
      */
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int16Array) => number): number;
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int16Array) => number, initialValue: number): number;

    /**
      * Calls the specified callback function for all the elements in an array, in descending order.
      * The return value of the callback function is the accumulated result, and is provided as an
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Int16Array) => U, initialValue: U): U;

    /**
      * Reverses the elements in an Array.
      */
    reverse(): Int16Array;

    /**
      * Sets a value or an array of values.
      * @param array A typed or untyped array of values to set.
      * @param offset The index in the current array at which the values are to be written.
      */
    set(array: ArrayLike<number>, offset?: number): void;

    /**
      * Returns a section of an array.
      * @param start The beginning of the specified portion of the array.
      * @param end The end of the specified portion of the array.
      */
    slice(start?: number, end?: number): Int16Array;

    /**
      * Determines whether the specified callback function returns true for any element of an array.
      * @param callbackfn A function that accepts up to three arguments. The some method calls the
      * callbackfn function for each element in array1 until the callbackfn returns true, or until
      * the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    some(callbackfn: (value: number, index: number, array: Int16Array) => boolean, thisArg?: any): boolean;

    /**
      * Sorts an array.
      * @param compareFn The name of the function used to determine the order of the elements. If
      * omitted, the elements are sorted in ascending, ASCII character order.
      */
    sort(compareFn?: (a: number, b: number) => number): this;

    /**
      * Gets a new Int16Array view of the ArrayBuffer store for this array, referencing the elements
      * at begin, inclusive, up to end, exclusive.
      * @param begin The index of the beginning of the array.
      * @param end The index of the end of the array.
      */
    subarray(begin: number, end?: number): Int16Array;

    /**
      * Converts a number to a string by using the current locale.
      */
    toLocaleString(): string;

    /**
      * Returns a string representation of an array.
      */
    toString(): string;

    [index: number]: number;
}

interface Int16ArrayConstructor {
    readonly prototype: Int16Array;
    new(length: number): Int16Array;
    new(arrayOrArrayBuffer: ArrayLike<number> | ArrayBufferLike): Int16Array;
    new(buffer: ArrayBufferLike, byteOffset: number, length?: number): Int16Array;

    /**
      * The size in bytes of each element in the array.
      */
    readonly BYTES_PER_ELEMENT: number;

    /**
      * Returns a new array from a set of elements.
      * @param items A set of elements to include in the new array object.
      */
    of(...items: number[]): Int16Array;

    /**
      * Creates an array from an array-like or iterable object.
      * @param arrayLike An array-like or iterable object to convert to an array.
      */
    from(arrayLike: ArrayLike<number>): Int16Array;

    /**
      * Creates an array from an array-like or iterable object.
      * @param arrayLike An array-like or iterable object to convert to an array.
      * @param mapfn A mapping function to call on every element of the array.
      * @param thisArg Value of 'this' used to invoke the mapfn.
      */
    from<T>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => number, thisArg?: any): Int16Array;


}
declare const Int16Array: Int16ArrayConstructor;

/**
  * A typed array of 16-bit unsigned integer values. The contents are initialized to 0. If the
  * requested number of bytes could not be allocated an exception is raised.
  */
interface Uint16Array {
    /**
      * The size in bytes of each element in the array.
      */
    readonly BYTES_PER_ELEMENT: number;

    /**
      * The ArrayBuffer instance referenced by the array.
      */
    readonly buffer: ArrayBufferLike;

    /**
      * The length in bytes of the array.
      */
    readonly byteLength: number;

    /**
      * The offset in bytes of the array.
      */
    readonly byteOffset: number;

    /**
      * Returns the this object after copying a section of the array identified by start and end
      * to the same array starting at position target
      * @param target If target is negative, it is treated as length+target where length is the
      * length of the array.
      * @param start If start is negative, it is treated as length+start. If end is negative, it
      * is treated as length+end.
      * @param end If not specified, length of the this object is used as its default value.
      */
    copyWithin(target: number, start: number, end?: number): this;

    /**
      * Determines whether all the members of an array satisfy the specified test.
      * @param callbackfn A function that accepts up to three arguments. The every method calls
      * the callbackfn function for each element in array1 until the callbackfn returns false,
      * or until the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    every(callbackfn: (value: number, index: number, array: Uint16Array) => boolean, thisArg?: any): boolean;

    /**
        * Returns the this object after filling the section identified by start and end with value
        * @param value value to fill array section with
        * @param start index to start filling the array at. If start is negative, it is treated as
        * length+start where length is the length of the array.
        * @param end index to stop filling the array at. If end is negative, it is treated as
        * length+end.
        */
    fill(value: number, start?: number, end?: number): this;

    /**
      * Returns the elements of an array that meet the condition specified in a callback function.
      * @param callbackfn A function that accepts up to three arguments. The filter method calls
      * the callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    filter(callbackfn: (value: number, index: number, array: Uint16Array) => any, thisArg?: any): Uint16Array;

    /**
      * Returns the value of the first element in the array where predicate is true, and undefined
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending
      * order, until it finds one where predicate returns true. If such an element is found, find
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of
      * predicate. If it is not provided, undefined is used instead.
      */
    find(predicate: (value: number, index: number, obj: Uint16Array) => boolean, thisArg?: any): number | undefined;

    /**
      * Returns the index of the first element in the array where predicate is true, and -1
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending
      * order, until it finds one where predicate returns true. If such an element is found,
      * findIndex immediately returns that element index. Otherwise, findIndex returns -1.
      * @param thisArg If provided, it will be used as the this value for each invocation of
      * predicate. If it is not provided, undefined is used instead.
      */
    findIndex(predicate: (value: number, index: number, obj: Uint16Array) => boolean, thisArg?: any): number;

    /**
      * Performs the specified action for each element in an array.
      * @param callbackfn  A function that accepts up to three arguments. forEach calls the
      * callbackfn function one time for each element in the array.
      * @param thisArg  An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    forEach(callbackfn: (value: number, index: number, array: Uint16Array) => void, thisArg?: any): void;

    /**
      * Returns the index of the first occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      *  search starts at index 0.
      */
    indexOf(searchElement: number, fromIndex?: number): number;

    /**
      * Adds all the elements of an array separated by the specified separator string.
      * @param separator A string used to separate one element of an array from the next in the
      * resulting String. If omitted, the array elements are separated with a comma.
      */
    join(separator?: string): string;

    /**
      * Returns the index of the last occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      * search starts at index 0.
      */
    lastIndexOf(searchElement: number, fromIndex?: number): number;

    /**
      * The length of the array.
      */
    readonly length: number;

    /**
      * Calls a defined callback function on each element of an array, and returns an array that
      * contains the results.
      * @param callbackfn A function that accepts up to three arguments. The map method calls the
      * callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    map(callbackfn: (value: number, index: number, array: Uint16Array) => number, thisArg?: any): Uint16Array;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of
      * the callback function is the accumulated result, and is provided as an argument in the next
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint16Array) => number): number;
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint16Array) => number, initialValue: number): number;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of
      * the callback function is the accumulated result, and is provided as an argument in the next
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint16Array) => U, initialValue: U): U;

    /**
      * Calls the specified callback function for all the elements in an array, in descending order.
      * The return value of the callback function is the accumulated result, and is provided as an
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an
      * argument instead of an array value.
      */
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint16Array) => number): number;
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint16Array) => number, initialValue: number): number;

    /**
      * Calls the specified callback function for all the elements in an array, in descending order.
      * The return value of the callback function is the accumulated result, and is provided as an
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint16Array) => U, initialValue: U): U;

    /**
      * Reverses the elements in an Array.
      */
    reverse(): Uint16Array;

    /**
      * Sets a value or an array of values.
      * @param array A typed or untyped array of values to set.
      * @param offset The index in the current array at which the values are to be written.
      */
    set(array: ArrayLike<number>, offset?: number): void;

    /**
      * Returns a section of an array.
      * @param start The beginning of the specified portion of the array.
      * @param end The end of the specified portion of the array.
      */
    slice(start?: number, end?: number): Uint16Array;

    /**
      * Determines whether the specified callback function returns true for any element of an array.
      * @param callbackfn A function that accepts up to three arguments. The some method calls the
      * callbackfn function for each element in array1 until the callbackfn returns true, or until
      * the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    some(callbackfn: (value: number, index: number, array: Uint16Array) => boolean, thisArg?: any): boolean;

    /**
      * Sorts an array.
      * @param compareFn The name of the function used to determine the order of the elements. If
      * omitted, the elements are sorted in ascending, ASCII character order.
      */
    sort(compareFn?: (a: number, b: number) => number): this;

    /**
      * Gets a new Uint16Array view of the ArrayBuffer store for this array, referencing the elements
      * at begin, inclusive, up to end, exclusive.
      * @param begin The index of the beginning of the array.
      * @param end The index of the end of the array.
      */
    subarray(begin: number, end?: number): Uint16Array;

    /**
      * Converts a number to a string by using the current locale.
      */
    toLocaleString(): string;

    /**
      * Returns a string representation of an array.
      */
    toString(): string;

    [index: number]: number;
}

interface Uint16ArrayConstructor {
    readonly prototype: Uint16Array;
    new(length: number): Uint16Array;
    new(arrayOrArrayBuffer: ArrayLike<number> | ArrayBufferLike): Uint16Array;
    new(buffer: ArrayBufferLike, byteOffset: number, length?: number): Uint16Array;

    /**
      * The size in bytes of each element in the array.
      */
    readonly BYTES_PER_ELEMENT: number;

    /**
      * Returns a new array from a set of elements.
      * @param items A set of elements to include in the new array object.
      */
    of(...items: number[]): Uint16Array;

    /**
      * Creates an array from an array-like or iterable object.
      * @param arrayLike An array-like or iterable object to convert to an array.
      */
    from(arrayLike: ArrayLike<number>): Uint16Array;

    /**
      * Creates an array from an array-like or iterable object.
      * @param arrayLike An array-like or iterable object to convert to an array.
      * @param mapfn A mapping function to call on every element of the array.
      * @param thisArg Value of 'this' used to invoke the mapfn.
      */
    from<T>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => number, thisArg?: any): Uint16Array;


}
declare const Uint16Array: Uint16ArrayConstructor;
/**
  * A typed array of 32-bit signed integer values. The contents are initialized to 0. If the
  * requested number of bytes could not be allocated an exception is raised.
  */
interface Int32Array {
    /**
      * The size in bytes of each element in the array.
      */
    readonly BYTES_PER_ELEMENT: number;

    /**
      * The ArrayBuffer instance referenced by the array.
      */
    readonly buffer: ArrayBufferLike;

    /**
      * The length in bytes of the array.
      */
    readonly byteLength: number;

    /**
      * The offset in bytes of the array.
      */
    readonly byteOffset: number;

    /**
      * Returns the this object after copying a section of the array identified by start and end
      * to the same array starting at position target
      * @param target If target is negative, it is treated as length+target where length is the
      * length of the array.
      * @param start If start is negative, it is treated as length+start. If end is negative, it
      * is treated as length+end.
      * @param end If not specified, length of the this object is used as its default value.
      */
    copyWithin(target: number, start: number, end?: number): this;

    /**
      * Determines whether all the members of an array satisfy the specified test.
      * @param callbackfn A function that accepts up to three arguments. The every method calls
      * the callbackfn function for each element in array1 until the callbackfn returns false,
      * or until the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    every(callbackfn: (value: number, index: number, array: Int32Array) => boolean, thisArg?: any): boolean;

    /**
        * Returns the this object after filling the section identified by start and end with value
        * @param value value to fill array section with
        * @param start index to start filling the array at. If start is negative, it is treated as
        * length+start where length is the length of the array.
        * @param end index to stop filling the array at. If end is negative, it is treated as
        * length+end.
        */
    fill(value: number, start?: number, end?: number): this;

    /**
      * Returns the elements of an array that meet the condition specified in a callback function.
      * @param callbackfn A function that accepts up to three arguments. The filter method calls
      * the callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    filter(callbackfn: (value: number, index: number, array: Int32Array) => any, thisArg?: any): Int32Array;

    /**
      * Returns the value of the first element in the array where predicate is true, and undefined
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending
      * order, until it finds one where predicate returns true. If such an element is found, find
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of
      * predicate. If it is not provided, undefined is used instead.
      */
    find(predicate: (value: number, index: number, obj: Int32Array) => boolean, thisArg?: any): number | undefined;

    /**
      * Returns the index of the first element in the array where predicate is true, and -1
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending
      * order, until it finds one where predicate returns true. If such an element is found,
      * findIndex immediately returns that element index. Otherwise, findIndex returns -1.
      * @param thisArg If provided, it will be used as the this value for each invocation of
      * predicate. If it is not provided, undefined is used instead.
      */
    findIndex(predicate: (value: number, index: number, obj: Int32Array) => boolean, thisArg?: any): number;

    /**
      * Performs the specified action for each element in an array.
      * @param callbackfn  A function that accepts up to three arguments. forEach calls the
      * callbackfn function one time for each element in the array.
      * @param thisArg  An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    forEach(callbackfn: (value: number, index: number, array: Int32Array) => void, thisArg?: any): void;

    /**
      * Returns the index of the first occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      *  search starts at index 0.
      */
    indexOf(searchElement: number, fromIndex?: number): number;

    /**
      * Adds all the elements of an array separated by the specified separator string.
      * @param separator A string used to separate one element of an array from the next in the
      * resulting String. If omitted, the array elements are separated with a comma.
      */
    join(separator?: string): string;

    /**
      * Returns the index of the last occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      * search starts at index 0.
      */
    lastIndexOf(searchElement: number, fromIndex?: number): number;

    /**
      * The length of the array.
      */
    readonly length: number;

    /**
      * Calls a defined callback function on each element of an array, and returns an array that
      * contains the results.
      * @param callbackfn A function that accepts up to three arguments. The map method calls the
      * callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    map(callbackfn: (value: number, index: number, array: Int32Array) => number, thisArg?: any): Int32Array;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of
      * the callback function is the accumulated result, and is provided as an argument in the next
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int32Array) => number): number;
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int32Array) => number, initialValue: number): number;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of
      * the callback function is the accumulated result, and is provided as an argument in the next
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Int32Array) => U, initialValue: U): U;

    /**
      * Calls the specified callback function for all the elements in an array, in descending order.
      * The return value of the callback function is the accumulated result, and is provided as an
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an
      * argument instead of an array value.
      */
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int32Array) => number): number;
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int32Array) => number, initialValue: number): number;

    /**
      * Calls the specified callback function for all the elements in an array, in descending order.
      * The return value of the callback function is the accumulated result, and is provided as an
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Int32Array) => U, initialValue: U): U;

    /**
      * Reverses the elements in an Array.
      */
    reverse(): Int32Array;

    /**
      * Sets a value or an array of values.
      * @param array A typed or untyped array of values to set.
      * @param offset The index in the current array at which the values are to be written.
      */
    set(array: ArrayLike<number>, offset?: number): void;

    /**
      * Returns a section of an array.
      * @param start The beginning of the specified portion of the array.
      * @param end The end of the specified portion of the array.
      */
    slice(start?: number, end?: number): Int32Array;

    /**
      * Determines whether the specified callback function returns true for any element of an array.
      * @param callbackfn A function that accepts up to three arguments. The some method calls the
      * callbackfn function for each element in array1 until the callbackfn returns true, or until
      * the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    some(callbackfn: (value: number, index: number, array: Int32Array) => boolean, thisArg?: any): boolean;

    /**
      * Sorts an array.
      * @param compareFn The name of the function used to determine the order of the elements. If
      * omitted, the elements are sorted in ascending, ASCII character order.
      */
    sort(compareFn?: (a: number, b: number) => number): this;

    /**
      * Gets a new Int32Array view of the ArrayBuffer store for this array, referencing the elements
      * at begin, inclusive, up to end, exclusive.
      * @param begin The index of the beginning of the array.
      * @param end The index of the end of the array.
      */
    subarray(begin: number, end?: number): Int32Array;

    /**
      * Converts a number to a string by using the current locale.
      */
    toLocaleString(): string;

    /**
      * Returns a string representation of an array.
      */
    toString(): string;

    [index: number]: number;
}

interface Int32ArrayConstructor {
    readonly prototype: Int32Array;
    new(length: number): Int32Array;
    new(arrayOrArrayBuffer: ArrayLike<number> | ArrayBufferLike): Int32Array;
    new(buffer: ArrayBufferLike, byteOffset: number, length?: number): Int32Array;

    /**
      * The size in bytes of each element in the array.
      */
    readonly BYTES_PER_ELEMENT: number;

    /**
      * Returns a new array from a set of elements.
      * @param items A set of elements to include in the new array object.
      */
    of(...items: number[]): Int32Array;

    /**
      * Creates an array from an array-like or iterable object.
      * @param arrayLike An array-like or iterable object to convert to an array.
      */
    from(arrayLike: ArrayLike<number>): Int32Array;

    /**
      * Creates an array from an array-like or iterable object.
      * @param arrayLike An array-like or iterable object to convert to an array.
      * @param mapfn A mapping function to call on every element of the array.
      * @param thisArg Value of 'this' used to invoke the mapfn.
      */
    from<T>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => number, thisArg?: any): Int32Array;

}
declare const Int32Array: Int32ArrayConstructor;

/**
  * A typed array of 32-bit unsigned integer values. The contents are initialized to 0. If the
  * requested number of bytes could not be allocated an exception is raised.
  */
interface Uint32Array {
    /**
      * The size in bytes of each element in the array.
      */
    readonly BYTES_PER_ELEMENT: number;

    /**
      * The ArrayBuffer instance referenced by the array.
      */
    readonly buffer: ArrayBufferLike;

    /**
      * The length in bytes of the array.
      */
    readonly byteLength: number;

    /**
      * The offset in bytes of the array.
      */
    readonly byteOffset: number;

    /**
      * Returns the this object after copying a section of the array identified by start and end
      * to the same array starting at position target
      * @param target If target is negative, it is treated as length+target where length is the
      * length of the array.
      * @param start If start is negative, it is treated as length+start. If end is negative, it
      * is treated as length+end.
      * @param end If not specified, length of the this object is used as its default value.
      */
    copyWithin(target: number, start: number, end?: number): this;

    /**
      * Determines whether all the members of an array satisfy the specified test.
      * @param callbackfn A function that accepts up to three arguments. The every method calls
      * the callbackfn function for each element in array1 until the callbackfn returns false,
      * or until the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    every(callbackfn: (value: number, index: number, array: Uint32Array) => boolean, thisArg?: any): boolean;

    /**
        * Returns the this object after filling the section identified by start and end with value
        * @param value value to fill array section with
        * @param start index to start filling the array at. If start is negative, it is treated as
        * length+start where length is the length of the array.
        * @param end index to stop filling the array at. If end is negative, it is treated as
        * length+end.
        */
    fill(value: number, start?: number, end?: number): this;

    /**
      * Returns the elements of an array that meet the condition specified in a callback function.
      * @param callbackfn A function that accepts up to three arguments. The filter method calls
      * the callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    filter(callbackfn: (value: number, index: number, array: Uint32Array) => any, thisArg?: any): Uint32Array;

    /**
      * Returns the value of the first element in the array where predicate is true, and undefined
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending
      * order, until it finds one where predicate returns true. If such an element is found, find
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of
      * predicate. If it is not provided, undefined is used instead.
      */
    find(predicate: (value: number, index: number, obj: Uint32Array) => boolean, thisArg?: any): number | undefined;

    /**
      * Returns the index of the first element in the array where predicate is true, and -1
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending
      * order, until it finds one where predicate returns true. If such an element is found,
      * findIndex immediately returns that element index. Otherwise, findIndex returns -1.
      * @param thisArg If provided, it will be used as the this value for each invocation of
      * predicate. If it is not provided, undefined is used instead.
      */
    findIndex(predicate: (value: number, index: number, obj: Uint32Array) => boolean, thisArg?: any): number;

    /**
      * Performs the specified action for each element in an array.
      * @param callbackfn  A function that accepts up to three arguments. forEach calls the
      * callbackfn function one time for each element in the array.
      * @param thisArg  An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    forEach(callbackfn: (value: number, index: number, array: Uint32Array) => void, thisArg?: any): void;
    /**
      * Returns the index of the first occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      *  search starts at index 0.
      */
    indexOf(searchElement: number, fromIndex?: number): number;

    /**
      * Adds all the elements of an array separated by the specified separator string.
      * @param separator A string used to separate one element of an array from the next in the
      * resulting String. If omitted, the array elements are separated with a comma.
      */
    join(separator?: string): string;

    /**
      * Returns the index of the last occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      * search starts at index 0.
      */
    lastIndexOf(searchElement: number, fromIndex?: number): number;

    /**
      * The length of the array.
      */
    readonly length: number;

    /**
      * Calls a defined callback function on each element of an array, and returns an array that
      * contains the results.
      * @param callbackfn A function that accepts up to three arguments. The map method calls the
      * callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    map(callbackfn: (value: number, index: number, array: Uint32Array) => number, thisArg?: any): Uint32Array;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of
      * the callback function is the accumulated result, and is provided as an argument in the next
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint32Array) => number): number;
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint32Array) => number, initialValue: number): number;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of
      * the callback function is the accumulated result, and is provided as an argument in the next
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint32Array) => U, initialValue: U): U;

    /**
      * Calls the specified callback function for all the elements in an array, in descending order.
      * The return value of the callback function is the accumulated result, and is provided as an
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an
      * argument instead of an array value.
      */
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint32Array) => number): number;
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint32Array) => number, initialValue: number): number;

    /**
      * Calls the specified callback function for all the elements in an array, in descending order.
      * The return value of the callback function is the accumulated result, and is provided as an
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint32Array) => U, initialValue: U): U;

    /**
      * Reverses the elements in an Array.
      */
    reverse(): Uint32Array;

    /**
      * Sets a value or an array of values.
      * @param array A typed or untyped array of values to set.
      * @param offset The index in the current array at which the values are to be written.
      */
    set(array: ArrayLike<number>, offset?: number): void;

    /**
      * Returns a section of an array.
      * @param start The beginning of the specified portion of the array.
      * @param end The end of the specified portion of the array.
      */
    slice(start?: number, end?: number): Uint32Array;

    /**
      * Determines whether the specified callback function returns true for any element of an array.
      * @param callbackfn A function that accepts up to three arguments. The some method calls the
      * callbackfn function for each element in array1 until the callbackfn returns true, or until
      * the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    some(callbackfn: (value: number, index: number, array: Uint32Array) => boolean, thisArg?: any): boolean;

    /**
      * Sorts an array.
      * @param compareFn The name of the function used to determine the order of the elements. If
      * omitted, the elements are sorted in ascending, ASCII character order.
      */
    sort(compareFn?: (a: number, b: number) => number): this;

    /**
      * Gets a new Uint32Array view of the ArrayBuffer store for this array, referencing the elements
      * at begin, inclusive, up to end, exclusive.
      * @param begin The index of the beginning of the array.
      * @param end The index of the end of the array.
      */
    subarray(begin: number, end?: number): Uint32Array;

    /**
      * Converts a number to a string by using the current locale.
      */
    toLocaleString(): string;

    /**
      * Returns a string representation of an array.
      */
    toString(): string;

    [index: number]: number;
}

interface Uint32ArrayConstructor {
    readonly prototype: Uint32Array;
    new(length: number): Uint32Array;
    new(arrayOrArrayBuffer: ArrayLike<number> | ArrayBufferLike): Uint32Array;
    new(buffer: ArrayBufferLike, byteOffset: number, length?: number): Uint32Array;

    /**
      * The size in bytes of each element in the array.
      */
    readonly BYTES_PER_ELEMENT: number;

    /**
      * Returns a new array from a set of elements.
      * @param items A set of elements to include in the new array object.
      */
    of(...items: number[]): Uint32Array;

    /**
      * Creates an array from an array-like or iterable object.
      * @param arrayLike An array-like or iterable object to convert to an array.
      */
    from(arrayLike: ArrayLike<number>): Uint32Array;

    /**
      * Creates an array from an array-like or iterable object.
      * @param arrayLike An array-like or iterable object to convert to an array.
      * @param mapfn A mapping function to call on every element of the array.
      * @param thisArg Value of 'this' used to invoke the mapfn.
      */
    from<T>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => number, thisArg?: any): Uint32Array;

}
declare const Uint32Array: Uint32ArrayConstructor;

/**
  * A typed array of 32-bit float values. The contents are initialized to 0. If the requested number
  * of bytes could not be allocated an exception is raised.
  */
interface Float32Array {
    /**
      * The size in bytes of each element in the array.
      */
    readonly BYTES_PER_ELEMENT: number;

    /**
      * The ArrayBuffer instance referenced by the array.
      */
    readonly buffer: ArrayBufferLike;

    /**
      * The length in bytes of the array.
      */
    readonly byteLength: number;

    /**
      * The offset in bytes of the array.
      */
    readonly byteOffset: number;

    /**
      * Returns the this object after copying a section of the array identified by start and end
      * to the same array starting at position target
      * @param target If target is negative, it is treated as length+target where length is the
      * length of the array.
      * @param start If start is negative, it is treated as length+start. If end is negative, it
      * is treated as length+end.
      * @param end If not specified, length of the this object is used as its default value.
      */
    copyWithin(target: number, start: number, end?: number): this;

    /**
      * Determines whether all the members of an array satisfy the specified test.
      * @param callbackfn A function that accepts up to three arguments. The every method calls
      * the callbackfn function for each element in array1 until the callbackfn returns false,
      * or until the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    every(callbackfn: (value: number, index: number, array: Float32Array) => boolean, thisArg?: any): boolean;

    /**
        * Returns the this object after filling the section identified by start and end with value
        * @param value value to fill array section with
        * @param start index to start filling the array at. If start is negative, it is treated as
        * length+start where length is the length of the array.
        * @param end index to stop filling the array at. If end is negative, it is treated as
        * length+end.
        */
    fill(value: number, start?: number, end?: number): this;

    /**
      * Returns the elements of an array that meet the condition specified in a callback function.
      * @param callbackfn A function that accepts up to three arguments. The filter method calls
      * the callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    filter(callbackfn: (value: number, index: number, array: Float32Array) => any, thisArg?: any): Float32Array;

    /**
      * Returns the value of the first element in the array where predicate is true, and undefined
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending
      * order, until it finds one where predicate returns true. If such an element is found, find
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of
      * predicate. If it is not provided, undefined is used instead.
      */
    find(predicate: (value: number, index: number, obj: Float32Array) => boolean, thisArg?: any): number | undefined;

    /**
      * Returns the index of the first element in the array where predicate is true, and -1
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending
      * order, until it finds one where predicate returns true. If such an element is found,
      * findIndex immediately returns that element index. Otherwise, findIndex returns -1.
      * @param thisArg If provided, it will be used as the this value for each invocation of
      * predicate. If it is not provided, undefined is used instead.
      */
    findIndex(predicate: (value: number, index: number, obj: Float32Array) => boolean, thisArg?: any): number;

    /**
      * Performs the specified action for each element in an array.
      * @param callbackfn  A function that accepts up to three arguments. forEach calls the
      * callbackfn function one time for each element in the array.
      * @param thisArg  An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    forEach(callbackfn: (value: number, index: number, array: Float32Array) => void, thisArg?: any): void;

    /**
      * Returns the index of the first occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      *  search starts at index 0.
      */
    indexOf(searchElement: number, fromIndex?: number): number;

    /**
      * Adds all the elements of an array separated by the specified separator string.
      * @param separator A string used to separate one element of an array from the next in the
      * resulting String. If omitted, the array elements are separated with a comma.
      */
    join(separator?: string): string;

    /**
      * Returns the index of the last occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      * search starts at index 0.
      */
    lastIndexOf(searchElement: number, fromIndex?: number): number;

    /**
      * The length of the array.
      */
    readonly length: number;

    /**
      * Calls a defined callback function on each element of an array, and returns an array that
      * contains the results.
      * @param callbackfn A function that accepts up to three arguments. The map method calls the
      * callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    map(callbackfn: (value: number, index: number, array: Float32Array) => number, thisArg?: any): Float32Array;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of
      * the callback function is the accumulated result, and is provided as an argument in the next
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float32Array) => number): number;
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float32Array) => number, initialValue: number): number;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of
      * the callback function is the accumulated result, and is provided as an argument in the next
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Float32Array) => U, initialValue: U): U;

    /**
      * Calls the specified callback function for all the elements in an array, in descending order.
      * The return value of the callback function is the accumulated result, and is provided as an
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an
      * argument instead of an array value.
      */
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float32Array) => number): number;
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float32Array) => number, initialValue: number): number;

    /**
      * Calls the specified callback function for all the elements in an array, in descending order.
      * The return value of the callback function is the accumulated result, and is provided as an
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Float32Array) => U, initialValue: U): U;

    /**
      * Reverses the elements in an Array.
      */
    reverse(): Float32Array;

    /**
      * Sets a value or an array of values.
      * @param array A typed or untyped array of values to set.
      * @param offset The index in the current array at which the values are to be written.
      */
    set(array: ArrayLike<number>, offset?: number): void;

    /**
      * Returns a section of an array.
      * @param start The beginning of the specified portion of the array.
      * @param end The end of the specified portion of the array.
      */
    slice(start?: number, end?: number): Float32Array;

    /**
      * Determines whether the specified callback function returns true for any element of an array.
      * @param callbackfn A function that accepts up to three arguments. The some method calls the
      * callbackfn function for each element in array1 until the callbackfn returns true, or until
      * the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    some(callbackfn: (value: number, index: number, array: Float32Array) => boolean, thisArg?: any): boolean;

    /**
      * Sorts an array.
      * @param compareFn The name of the function used to determine the order of the elements. If
      * omitted, the elements are sorted in ascending, ASCII character order.
      */
    sort(compareFn?: (a: number, b: number) => number): this;

    /**
      * Gets a new Float32Array view of the ArrayBuffer store for this array, referencing the elements
      * at begin, inclusive, up to end, exclusive.
      * @param begin The index of the beginning of the array.
      * @param end The index of the end of the array.
      */
    subarray(begin: number, end?: number): Float32Array;

    /**
      * Converts a number to a string by using the current locale.
      */
    toLocaleString(): string;

    /**
      * Returns a string representation of an array.
      */
    toString(): string;

    [index: number]: number;
}

interface Float32ArrayConstructor {
    readonly prototype: Float32Array;
    new(length: number): Float32Array;
    new(arrayOrArrayBuffer: ArrayLike<number> | ArrayBufferLike): Float32Array;
    new(buffer: ArrayBufferLike, byteOffset: number, length?: number): Float32Array;

    /**
      * The size in bytes of each element in the array.
      */
    readonly BYTES_PER_ELEMENT: number;

    /**
      * Returns a new array from a set of elements.
      * @param items A set of elements to include in the new array object.
      */
    of(...items: number[]): Float32Array;

    /**
      * Creates an array from an array-like or iterable object.
      * @param arrayLike An array-like or iterable object to convert to an array.
      */
    from(arrayLike: ArrayLike<number>): Float32Array;

    /**
      * Creates an array from an array-like or iterable object.
      * @param arrayLike An array-like or iterable object to convert to an array.
      * @param mapfn A mapping function to call on every element of the array.
      * @param thisArg Value of 'this' used to invoke the mapfn.
      */
    from<T>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => number, thisArg?: any): Float32Array;


}
declare const Float32Array: Float32ArrayConstructor;

/**
  * A typed array of 64-bit float values. The contents are initialized to 0. If the requested
  * number of bytes could not be allocated an exception is raised.
  */
interface Float64Array {
    /**
      * The size in bytes of each element in the array.
      */
    readonly BYTES_PER_ELEMENT: number;

    /**
      * The ArrayBuffer instance referenced by the array.
      */
    readonly buffer: ArrayBufferLike;

    /**
      * The length in bytes of the array.
      */
    readonly byteLength: number;

    /**
      * The offset in bytes of the array.
      */
    readonly byteOffset: number;

    /**
      * Returns the this object after copying a section of the array identified by start and end
      * to the same array starting at position target
      * @param target If target is negative, it is treated as length+target where length is the
      * length of the array.
      * @param start If start is negative, it is treated as length+start. If end is negative, it
      * is treated as length+end.
      * @param end If not specified, length of the this object is used as its default value.
      */
    copyWithin(target: number, start: number, end?: number): this;

    /**
      * Determines whether all the members of an array satisfy the specified test.
      * @param callbackfn A function that accepts up to three arguments. The every method calls
      * the callbackfn function for each element in array1 until the callbackfn returns false,
      * or until the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    every(callbackfn: (value: number, index: number, array: Float64Array) => boolean, thisArg?: any): boolean;

    /**
        * Returns the this object after filling the section identified by start and end with value
        * @param value value to fill array section with
        * @param start index to start filling the array at. If start is negative, it is treated as
        * length+start where length is the length of the array.
        * @param end index to stop filling the array at. If end is negative, it is treated as
        * length+end.
        */
    fill(value: number, start?: number, end?: number): this;

    /**
      * Returns the elements of an array that meet the condition specified in a callback function.
      * @param callbackfn A function that accepts up to three arguments. The filter method calls
      * the callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    filter(callbackfn: (value: number, index: number, array: Float64Array) => any, thisArg?: any): Float64Array;

    /**
      * Returns the value of the first element in the array where predicate is true, and undefined
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending
      * order, until it finds one where predicate returns true. If such an element is found, find
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of
      * predicate. If it is not provided, undefined is used instead.
      */
    find(predicate: (value: number, index: number, obj: Float64Array) => boolean, thisArg?: any): number | undefined;

    /**
      * Returns the index of the first element in the array where predicate is true, and -1
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending
      * order, until it finds one where predicate returns true. If such an element is found,
      * findIndex immediately returns that element index. Otherwise, findIndex returns -1.
      * @param thisArg If provided, it will be used as the this value for each invocation of
      * predicate. If it is not provided, undefined is used instead.
      */
    findIndex(predicate: (value: number, index: number, obj: Float64Array) => boolean, thisArg?: any): number;

    /**
      * Performs the specified action for each element in an array.
      * @param callbackfn  A function that accepts up to three arguments. forEach calls the
      * callbackfn function one time for each element in the array.
      * @param thisArg  An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    forEach(callbackfn: (value: number, index: number, array: Float64Array) => void, thisArg?: any): void;

    /**
      * Returns the index of the first occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      *  search starts at index 0.
      */
    indexOf(searchElement: number, fromIndex?: number): number;

    /**
      * Adds all the elements of an array separated by the specified separator string.
      * @param separator A string used to separate one element of an array from the next in the
      * resulting String. If omitted, the array elements are separated with a comma.
      */
    join(separator?: string): string;

    /**
      * Returns the index of the last occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      * search starts at index 0.
      */
    lastIndexOf(searchElement: number, fromIndex?: number): number;

    /**
      * The length of the array.
      */
    readonly length: number;

    /**
      * Calls a defined callback function on each element of an array, and returns an array that
      * contains the results.
      * @param callbackfn A function that accepts up to three arguments. The map method calls the
      * callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    map(callbackfn: (value: number, index: number, array: Float64Array) => number, thisArg?: any): Float64Array;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of
      * the callback function is the accumulated result, and is provided as an argument in the next
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float64Array) => number): number;
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float64Array) => number, initialValue: number): number;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of
      * the callback function is the accumulated result, and is provided as an argument in the next
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Float64Array) => U, initialValue: U): U;

    /**
      * Calls the specified callback function for all the elements in an array, in descending order.
      * The return value of the callback function is the accumulated result, and is provided as an
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an
      * argument instead of an array value.
      */
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float64Array) => number): number;
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float64Array) => number, initialValue: number): number;

    /**
      * Calls the specified callback function for all the elements in an array, in descending order.
      * The return value of the callback function is the accumulated result, and is provided as an
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Float64Array) => U, initialValue: U): U;

    /**
      * Reverses the elements in an Array.
      */
    reverse(): Float64Array;

    /**
      * Sets a value or an array of values.
      * @param array A typed or untyped array of values to set.
      * @param offset The index in the current array at which the values are to be written.
      */
    set(array: ArrayLike<number>, offset?: number): void;

    /**
      * Returns a section of an array.
      * @param start The beginning of the specified portion of the array.
      * @param end The end of the specified portion of the array.
      */
    slice(start?: number, end?: number): Float64Array;

    /**
      * Determines whether the specified callback function returns true for any element of an array.
      * @param callbackfn A function that accepts up to three arguments. The some method calls the
      * callbackfn function for each element in array1 until the callbackfn returns true, or until
      * the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    some(callbackfn: (value: number, index: number, array: Float64Array) => boolean, thisArg?: any): boolean;

    /**
      * Sorts an array.
      * @param compareFn The name of the function used to determine the order of the elements. If
      * omitted, the elements are sorted in ascending, ASCII character order.
      */
    sort(compareFn?: (a: number, b: number) => number): this;

    /**
      * Gets a new Float64Array view of the ArrayBuffer store for this array, referencing the elements
      * at begin, inclusive, up to end, exclusive.
      * @param begin The index of the beginning of the array.
      * @param end The index of the end of the array.
      */
    subarray(begin: number, end?: number): Float64Array;

    /**
      * Converts a number to a string by using the current locale.
      */
    toLocaleString(): string;

    /**
      * Returns a string representation of an array.
      */
    toString(): string;

    [index: number]: number;
}

interface Float64ArrayConstructor {
    readonly prototype: Float64Array;
    new(length: number): Float64Array;
    new(arrayOrArrayBuffer: ArrayLike<number> | ArrayBufferLike): Float64Array;
    new(buffer: ArrayBufferLike, byteOffset: number, length?: number): Float64Array;

    /**
      * The size in bytes of each element in the array.
      */
    readonly BYTES_PER_ELEMENT: number;

    /**
      * Returns a new array from a set of elements.
      * @param items A set of elements to include in the new array object.
      */
    of(...items: number[]): Float64Array;

    /**
      * Creates an array from an array-like or iterable object.
      * @param arrayLike An array-like or iterable object to convert to an array.
      */
    from(arrayLike: ArrayLike<number>): Float64Array;

    /**
      * Creates an array from an array-like or iterable object.
      * @param arrayLike An array-like or iterable object to convert to an array.
      * @param mapfn A mapping function to call on every element of the array.
      * @param thisArg Value of 'this' used to invoke the mapfn.
      */
    from<T>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => number, thisArg?: any): Float64Array;

}
declare const Float64Array: Float64ArrayConstructor;

/////////////////////////////
/// ECMAScript Internationalization API
/////////////////////////////

declare namespace Intl {
    interface CollatorOptions {
        usage?: string;
        localeMatcher?: string;
        numeric?: boolean;
        caseFirst?: string;
        sensitivity?: string;
        ignorePunctuation?: boolean;
    }

    interface ResolvedCollatorOptions {
        locale: string;
        usage: string;
        sensitivity: string;
        ignorePunctuation: boolean;
        collation: string;
        caseFirst: string;
        numeric: boolean;
    }

    interface Collator {
        compare(x: string, y: string): number;
        resolvedOptions(): ResolvedCollatorOptions;
    }
    var Collator: {
        new(locales?: string | string[], options?: CollatorOptions): Collator;
        (locales?: string | string[], options?: CollatorOptions): Collator;
        supportedLocalesOf(locales: string | string[], options?: CollatorOptions): string[];
    };

    interface NumberFormatOptions {
        localeMatcher?: string;
        style?: string;
        currency?: string;
        currencyDisplay?: string;
        useGrouping?: boolean;
        minimumIntegerDigits?: number;
        minimumFractionDigits?: number;
        maximumFractionDigits?: number;
        minimumSignificantDigits?: number;
        maximumSignificantDigits?: number;
    }

    interface ResolvedNumberFormatOptions {
        locale: string;
        numberingSystem: string;
        style: string;
        currency?: string;
        currencyDisplay?: string;
        minimumIntegerDigits: number;
        minimumFractionDigits: number;
        maximumFractionDigits: number;
        minimumSignificantDigits?: number;
        maximumSignificantDigits?: number;
        useGrouping: boolean;
    }

    interface NumberFormat {
        format(value: number): string;
        resolvedOptions(): ResolvedNumberFormatOptions;
    }
    var NumberFormat: {
        new(locales?: string | string[], options?: NumberFormatOptions): NumberFormat;
        (locales?: string | string[], options?: NumberFormatOptions): NumberFormat;
        supportedLocalesOf(locales: string | string[], options?: NumberFormatOptions): string[];
    };

    interface DateTimeFormatOptions {
        localeMatcher?: string;
        weekday?: string;
        era?: string;
        year?: string;
        month?: string;
        day?: string;
        hour?: string;
        minute?: string;
        second?: string;
        timeZoneName?: string;
        formatMatcher?: string;
        hour12?: boolean;
        timeZone?: string;
    }

    interface ResolvedDateTimeFormatOptions {
        locale: string;
        calendar: string;
        numberingSystem: string;
        timeZone: string;
        hour12?: boolean;
        weekday?: string;
        era?: string;
        year?: string;
        month?: string;
        day?: string;
        hour?: string;
        minute?: string;
        second?: string;
        timeZoneName?: string;
    }

    interface DateTimeFormat {
        format(date?: Date | number): string;
        resolvedOptions(): ResolvedDateTimeFormatOptions;
    }
    var DateTimeFormat: {
        new(locales?: string | string[], options?: DateTimeFormatOptions): DateTimeFormat;
        (locales?: string | string[], options?: DateTimeFormatOptions): DateTimeFormat;
        supportedLocalesOf(locales: string | string[], options?: DateTimeFormatOptions): string[];
    };
}

interface String {
    /**
      * Determines whether two strings are equivalent in the current or specified locale.
      * @param that String to compare to target string
      * @param locales A locale string or array of locale strings that contain one or more language or locale tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the JavaScript runtime is used. This parameter must conform to BCP 47 standards; see the Intl.Collator object for details.
      * @param options An object that contains one or more properties that specify comparison options. see the Intl.Collator object for details.
      */
    localeCompare(that: string, locales?: string | string[], options?: Intl.CollatorOptions): number;
}

interface Number {
    /**
      * Converts a number to a string by using the current or specified locale.
      * @param locales A locale string or array of locale strings that contain one or more language or locale tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the JavaScript runtime is used.
      * @param options An object that contains one or more properties that specify comparison options.
      */
    toLocaleString(locales?: string | string[], options?: Intl.NumberFormatOptions): string;
}

interface Date {
    /**
      * Converts a date and time to a string by using the current or specified locale.
      * @param locales A locale string or array of locale strings that contain one or more language or locale tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the JavaScript runtime is used.
      * @param options An object that contains one or more properties that specify comparison options.
      */
    toLocaleString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;
    /**
      * Converts a date to a string by using the current or specified locale.
      * @param locales A locale string or array of locale strings that contain one or more language or locale tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the JavaScript runtime is used.
      * @param options An object that contains one or more properties that specify comparison options.
      */
    toLocaleDateString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;

    /**
      * Converts a time to a string by using the current or specified locale.
      * @param locales A locale string or array of locale strings that contain one or more language or locale tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the JavaScript runtime is used.
      * @param options An object that contains one or more properties that specify comparison options.
      */
    toLocaleTimeString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved. 
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0  
 
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE, 
MERCHANTABLITY OR NON-INFRINGEMENT. 
 
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */



/// <reference no-default-lib="true"/>


interface Array<T> {
    /**
     * Returns the value of the first element in the array where predicate is true, and undefined
     * otherwise.
     * @param predicate find calls predicate once for each element of the array, in ascending
     * order, until it finds one where predicate returns true. If such an element is found, find
     * immediately returns that element value. Otherwise, find returns undefined.
     * @param thisArg If provided, it will be used as the this value for each invocation of
     * predicate. If it is not provided, undefined is used instead.
     */
    find<S extends T>(predicate: (this: void, value: T, index: number, obj: T[]) => value is S, thisArg?: any): S | undefined;
    find(predicate: (value: T, index: number, obj: T[]) => boolean, thisArg?: any): T | undefined;

    /**
     * Returns the index of the first element in the array where predicate is true, and -1
     * otherwise.
     * @param predicate find calls predicate once for each element of the array, in ascending
     * order, until it finds one where predicate returns true. If such an element is found,
     * findIndex immediately returns that element index. Otherwise, findIndex returns -1.
     * @param thisArg If provided, it will be used as the this value for each invocation of
     * predicate. If it is not provided, undefined is used instead.
     */
    findIndex(predicate: (value: T, index: number, obj: T[]) => boolean, thisArg?: any): number;

    /**
     * Returns the this object after filling the section identified by start and end with value
     * @param value value to fill array section with
     * @param start index to start filling the array at. If start is negative, it is treated as
     * length+start where length is the length of the array.
     * @param end index to stop filling the array at. If end is negative, it is treated as
     * length+end.
     */
    fill(value: T, start?: number, end?: number): this;

    /**
     * Returns the this object after copying a section of the array identified by start and end
     * to the same array starting at position target
     * @param target If target is negative, it is treated as length+target where length is the
     * length of the array.
     * @param start If start is negative, it is treated as length+start. If end is negative, it
     * is treated as length+end.
     * @param end If not specified, length of the this object is used as its default value.
     */
    copyWithin(target: number, start: number, end?: number): this;
}

interface ArrayConstructor {
    /**
     * Creates an array from an array-like object.
     * @param arrayLike An array-like object to convert to an array.
     */
    from<T>(arrayLike: ArrayLike<T>): T[];

    /**
     * Creates an array from an iterable object.
     * @param arrayLike An array-like object to convert to an array.
     * @param mapfn A mapping function to call on every element of the array.
     * @param thisArg Value of 'this' used to invoke the mapfn.
     */
    from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];

    /**
     * Returns a new array from a set of elements.
     * @param items A set of elements to include in the new array object.
     */
    of<T>(...items: T[]): T[];
}

interface DateConstructor {
    new (value: number | string | Date): Date;
}

interface Function {
    /**
     * Returns the name of the function. Function names are read-only and can not be changed.
     */
    readonly name: string;
}

interface Math {
    /**
     * Returns the number of leading zero bits in the 32-bit binary representation of a number.
     * @param x A numeric expression.
     */
    clz32(x: number): number;

    /**
     * Returns the result of 32-bit multiplication of two numbers.
     * @param x First number
     * @param y Second number
     */
    imul(x: number, y: number): number;

    /**
     * Returns the sign of the x, indicating whether x is positive, negative or zero.
     * @param x The numeric expression to test
     */
    sign(x: number): number;

    /**
     * Returns the base 10 logarithm of a number.
     * @param x A numeric expression.
     */
    log10(x: number): number;

    /**
     * Returns the base 2 logarithm of a number.
     * @param x A numeric expression.
     */
    log2(x: number): number;

    /**
     * Returns the natural logarithm of 1 + x.
     * @param x A numeric expression.
     */
    log1p(x: number): number;

    /**
     * Returns the result of (e^x - 1), which is an implementation-dependent approximation to
     * subtracting 1 from the exponential function of x (e raised to the power of x, where e
     * is the base of the natural logarithms).
     * @param x A numeric expression.
     */
    expm1(x: number): number;

    /**
     * Returns the hyperbolic cosine of a number.
     * @param x A numeric expression that contains an angle measured in radians.
     */
    cosh(x: number): number;

    /**
     * Returns the hyperbolic sine of a number.
     * @param x A numeric expression that contains an angle measured in radians.
     */
    sinh(x: number): number;

    /**
     * Returns the hyperbolic tangent of a number.
     * @param x A numeric expression that contains an angle measured in radians.
     */
    tanh(x: number): number;

    /**
     * Returns the inverse hyperbolic cosine of a number.
     * @param x A numeric expression that contains an angle measured in radians.
     */
    acosh(x: number): number;

    /**
     * Returns the inverse hyperbolic sine of a number.
     * @param x A numeric expression that contains an angle measured in radians.
     */
    asinh(x: number): number;

    /**
     * Returns the inverse hyperbolic tangent of a number.
     * @param x A numeric expression that contains an angle measured in radians.
     */
    atanh(x: number): number;

    /**
     * Returns the square root of the sum of squares of its arguments.
     * @param values Values to compute the square root for.
     *     If no arguments are passed, the result is +0.
     *     If there is only one argument, the result is the absolute value.
     *     If any argument is +Infinity or -Infinity, the result is +Infinity.
     *     If any argument is NaN, the result is NaN.
     *     If all arguments are either +0 or −0, the result is +0.
     */
    hypot(...values: number[]): number;

    /**
     * Returns the integral part of the a numeric expression, x, removing any fractional digits.
     * If x is already an integer, the result is x.
     * @param x A numeric expression.
     */
    trunc(x: number): number;

    /**
     * Returns the nearest single precision float representation of a number.
     * @param x A numeric expression.
     */
    fround(x: number): number;

    /**
     * Returns an implementation-dependent approximation to the cube root of number.
     * @param x A numeric expression.
     */
    cbrt(x: number): number;
}

interface NumberConstructor {
    /**
     * The value of Number.EPSILON is the difference between 1 and the smallest value greater than 1
     * that is representable as a Number value, which is approximately:
     * 2.2204460492503130808472633361816 x 10‍−‍16.
     */
    readonly EPSILON: number;

    /**
     * Returns true if passed value is finite.
     * Unlike the global isFinite, Number.isFinite doesn't forcibly convert the parameter to a
     * number. Only finite values of the type number, result in true.
     * @param number A numeric value.
     */
    isFinite(number: number): boolean;

    /**
     * Returns true if the value passed is an integer, false otherwise.
     * @param number A numeric value.
     */
    isInteger(number: number): boolean;

    /**
     * Returns a Boolean value that indicates whether a value is the reserved value NaN (not a
     * number). Unlike the global isNaN(), Number.isNaN() doesn't forcefully convert the parameter
     * to a number. Only values of the type number, that are also NaN, result in true.
     * @param number A numeric value.
     */
    isNaN(number: number): boolean;

    /**
     * Returns true if the value passed is a safe integer.
     * @param number A numeric value.
     */
    isSafeInteger(number: number): boolean;

    /**
     * The value of the largest integer n such that n and n + 1 are both exactly representable as
     * a Number value.
     * The value of Number.MAX_SAFE_INTEGER is 9007199254740991 2^53 − 1.
     */
    readonly MAX_SAFE_INTEGER: number;

    /**
     * The value of the smallest integer n such that n and n − 1 are both exactly representable as
     * a Number value.
     * The value of Number.MIN_SAFE_INTEGER is −9007199254740991 (−(2^53 − 1)).
     */
    readonly MIN_SAFE_INTEGER: number;

    /**
     * Converts a string to a floating-point number.
     * @param string A string that contains a floating-point number.
     */
    parseFloat(string: string): number;

    /**
     * Converts A string to an integer.
     * @param s A string to convert into a number.
     * @param radix A value between 2 and 36 that specifies the base of the number in numString.
     * If this argument is not supplied, strings with a prefix of '0x' are considered hexadecimal.
     * All other strings are considered decimal.
     */
    parseInt(string: string, radix?: number): number;
}

interface ObjectConstructor {
    /**
     * Copy the values of all of the enumerable own properties from one or more source objects to a
     * target object. Returns the target object.
     * @param target The target object to copy to.
     * @param source The source object from which to copy properties.
     */
    assign<T, U>(target: T, source: U): T & U;

    /**
     * Copy the values of all of the enumerable own properties from one or more source objects to a
     * target object. Returns the target object.
     * @param target The target object to copy to.
     * @param source1 The first source object from which to copy properties.
     * @param source2 The second source object from which to copy properties.
     */
    assign<T, U, V>(target: T, source1: U, source2: V): T & U & V;

    /**
     * Copy the values of all of the enumerable own properties from one or more source objects to a
     * target object. Returns the target object.
     * @param target The target object to copy to.
     * @param source1 The first source object from which to copy properties.
     * @param source2 The second source object from which to copy properties.
     * @param source3 The third source object from which to copy properties.
     */
    assign<T, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;

    /**
     * Copy the values of all of the enumerable own properties from one or more source objects to a
     * target object. Returns the target object.
     * @param target The target object to copy to.
     * @param sources One or more source objects from which to copy properties
     */
    assign(target: object, ...sources: any[]): any;

    /**
     * Returns an array of all symbol properties found directly on object o.
     * @param o Object to retrieve the symbols from.
     */
    getOwnPropertySymbols(o: any): symbol[];

    /**
     * Returns true if the values are the same value, false otherwise.
     * @param value1 The first value.
     * @param value2 The second value.
     */
    is(value1: any, value2: any): boolean;

    /**
     * Sets the prototype of a specified object o to  object proto or null. Returns the object o.
     * @param o The object to change its prototype.
     * @param proto The value of the new prototype or null.
     */
    setPrototypeOf(o: any, proto: object | null): any;
}

interface ReadonlyArray<T> {
    /**
     * Returns the value of the first element in the array where predicate is true, and undefined
     * otherwise.
     * @param predicate find calls predicate once for each element of the array, in ascending
     * order, until it finds one where predicate returns true. If such an element is found, find
     * immediately returns that element value. Otherwise, find returns undefined.
     * @param thisArg If provided, it will be used as the this value for each invocation of
     * predicate. If it is not provided, undefined is used instead.
     */
    find<S extends T>(predicate: (this: void, value: T, index: number, obj: ReadonlyArray<T>) => value is S, thisArg?: any): S | undefined;
    find(predicate: (value: T, index: number, obj: ReadonlyArray<T>) => boolean, thisArg?: any): T | undefined;

    /**
     * Returns the index of the first element in the array where predicate is true, and -1
     * otherwise.
     * @param predicate find calls predicate once for each element of the array, in ascending
     * order, until it finds one where predicate returns true. If such an element is found,
     * findIndex immediately returns that element index. Otherwise, findIndex returns -1.
     * @param thisArg If provided, it will be used as the this value for each invocation of
     * predicate. If it is not provided, undefined is used instead.
     */
    findIndex(predicate: (value: T, index: number, obj: ReadonlyArray<T>) => boolean, thisArg?: any): number;
}

interface RegExp {
    /**
     * Returns a string indicating the flags of the regular expression in question. This field is read-only.
     * The characters in this string are sequenced and concatenated in the following order:
     *
     *    - "g" for global
     *    - "i" for ignoreCase
     *    - "m" for multiline
     *    - "u" for unicode
     *    - "y" for sticky
     *
     * If no flags are set, the value is the empty string.
     */
    readonly flags: string;

    /**
     * Returns a Boolean value indicating the state of the sticky flag (y) used with a regular
     * expression. Default is false. Read-only.
     */
    readonly sticky: boolean;

    /**
     * Returns a Boolean value indicating the state of the Unicode flag (u) used with a regular
     * expression. Default is false. Read-only.
     */
    readonly unicode: boolean;
}

interface RegExpConstructor {
    new (pattern: RegExp, flags?: string): RegExp;
    (pattern: RegExp, flags?: string): RegExp;
}

interface String {
    /**
     * Returns a nonnegative integer Number less than 1114112 (0x110000) that is the code point
     * value of the UTF-16 encoded code point starting at the string element at position pos in
     * the String resulting from converting this object to a String.
     * If there is no element at that position, the result is undefined.
     * If a valid UTF-16 surrogate pair does not begin at pos, the result is the code unit at pos.
     */
    codePointAt(pos: number): number | undefined;

    /**
     * Returns true if searchString appears as a substring of the result of converting this
     * object to a String, at one or more positions that are
     * greater than or equal to position; otherwise, returns false.
     * @param searchString search string
     * @param position If position is undefined, 0 is assumed, so as to search all of the String.
     */
    includes(searchString: string, position?: number): boolean;

    /**
     * Returns true if the sequence of elements of searchString converted to a String is the
     * same as the corresponding elements of this object (converted to a String) starting at
     * endPosition – length(this). Otherwise returns false.
     */
    endsWith(searchString: string, endPosition?: number): boolean;

    /**
     * Returns the String value result of normalizing the string into the normalization form
     * named by form as specified in Unicode Standard Annex #15, Unicode Normalization Forms.
     * @param form Applicable values: "NFC", "NFD", "NFKC", or "NFKD", If not specified default
     * is "NFC"
     */
    normalize(form: "NFC" | "NFD" | "NFKC" | "NFKD"): string;

    /**
     * Returns the String value result of normalizing the string into the normalization form
     * named by form as specified in Unicode Standard Annex #15, Unicode Normalization Forms.
     * @param form Applicable values: "NFC", "NFD", "NFKC", or "NFKD", If not specified default
     * is "NFC"
     */
    normalize(form?: string): string;

    /**
     * Returns a String value that is made from count copies appended together. If count is 0,
     * the empty string is returned.
     * @param count number of copies to append
     */
    repeat(count: number): string;

    /**
     * Returns true if the sequence of elements of searchString converted to a String is the
     * same as the corresponding elements of this object (converted to a String) starting at
     * position. Otherwise returns false.
     */
    startsWith(searchString: string, position?: number): boolean;

    /**
     * Returns an <a> HTML anchor element and sets the name attribute to the text value
     * @param name
     */
    anchor(name: string): string;

    /** Returns a <big> HTML element */
    big(): string;

    /** Returns a <blink> HTML element */
    blink(): string;

    /** Returns a <b> HTML element */
    bold(): string;

    /** Returns a <tt> HTML element */
    fixed(): string;

    /** Returns a <font> HTML element and sets the color attribute value */
    fontcolor(color: string): string;

    /** Returns a <font> HTML element and sets the size attribute value */
    fontsize(size: number): string;

    /** Returns a <font> HTML element and sets the size attribute value */
    fontsize(size: string): string;

    /** Returns an <i> HTML element */
    italics(): string;

    /** Returns an <a> HTML element and sets the href attribute value */
    link(url: string): string;

    /** Returns a <small> HTML element */
    small(): string;

    /** Returns a <strike> HTML element */
    strike(): string;

    /** Returns a <sub> HTML element */
    sub(): string;

    /** Returns a <sup> HTML element */
    sup(): string;
}

interface StringConstructor {
    /**
     * Return the String value whose elements are, in order, the elements in the List elements.
     * If length is 0, the empty string is returned.
     */
    fromCodePoint(...codePoints: number[]): string;

    /**
     * String.raw is intended for use as a tag function of a Tagged Template String. When called
     * as such the first argument will be a well formed template call site object and the rest
     * parameter will contain the substitution values.
     * @param template A well-formed template string call site representation.
     * @param substitutions A set of substitution values.
     */
    raw(template: TemplateStringsArray, ...substitutions: any[]): string;
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved. 
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0  
 
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE, 
MERCHANTABLITY OR NON-INFRINGEMENT. 
 
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */



/// <reference no-default-lib="true"/>


interface Map<K, V> {
    clear(): void;
    delete(key: K): boolean;
    forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;
    get(key: K): V | undefined;
    has(key: K): boolean;
    set(key: K, value: V): this;
    readonly size: number;
}

interface MapConstructor {
    new(): Map<any, any>;
    new<K, V>(entries?: ReadonlyArray<[K, V]> | null): Map<K, V>;
    readonly prototype: Map<any, any>;
}
declare var Map: MapConstructor;

interface ReadonlyMap<K, V> {
    forEach(callbackfn: (value: V, key: K, map: ReadonlyMap<K, V>) => void, thisArg?: any): void;
    get(key: K): V | undefined;
    has(key: K): boolean;
    readonly size: number;
}

interface WeakMap<K extends object, V> {
    delete(key: K): boolean;
    get(key: K): V | undefined;
    has(key: K): boolean;
    set(key: K, value: V): this;
}

interface WeakMapConstructor {
    new <K extends object = object, V = any>(entries?: ReadonlyArray<[K, V]> | null): WeakMap<K, V>;
    readonly prototype: WeakMap<object, any>;
}
declare var WeakMap: WeakMapConstructor;

interface Set<T> {
    add(value: T): this;
    clear(): void;
    delete(value: T): boolean;
    forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void, thisArg?: any): void;
    has(value: T): boolean;
    readonly size: number;
}

interface SetConstructor {
    new <T = any>(values?: ReadonlyArray<T> | null): Set<T>;
    readonly prototype: Set<any>;
}
declare var Set: SetConstructor;

interface ReadonlySet<T> {
    forEach(callbackfn: (value: T, value2: T, set: ReadonlySet<T>) => void, thisArg?: any): void;
    has(value: T): boolean;
    readonly size: number;
}

interface WeakSet<T extends object> {
    add(value: T): this;
    delete(value: T): boolean;
    has(value: T): boolean;
}

interface WeakSetConstructor {
    new <T extends object = object>(values?: ReadonlyArray<T> | null): WeakSet<T>;
    readonly prototype: WeakSet<object>;
}
declare var WeakSet: WeakSetConstructor;

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved. 
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0  
 
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE, 
MERCHANTABLITY OR NON-INFRINGEMENT. 
 
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */



/// <reference no-default-lib="true"/>


interface Generator extends Iterator<any> { }

interface GeneratorFunction {
    /**
     * Creates a new Generator object.
     * @param args A list of arguments the function accepts.
     */
    new (...args: any[]): Generator;
    /**
     * Creates a new Generator object.
     * @param args A list of arguments the function accepts.
     */
    (...args: any[]): Generator;
    /**
     * The length of the arguments.
     */
    readonly length: number;
    /**
     * Returns the name of the function.
     */
    readonly name: string;
    /**
     * A reference to the prototype.
     */
    readonly prototype: Generator;
}

interface GeneratorFunctionConstructor {
    /**
     * Creates a new Generator function.
     * @param args A list of arguments the function accepts.
     */
    new (...args: string[]): GeneratorFunction;
    /**
     * Creates a new Generator function.
     * @param args A list of arguments the function accepts.
     */
    (...args: string[]): GeneratorFunction;
    /**
     * The length of the arguments.
     */
    readonly length: number;
    /**
     * Returns the name of the function.
     */
    readonly name: string;
    /**
     * A reference to the prototype.
     */
    readonly prototype: GeneratorFunction;
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved. 
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0  
 
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE, 
MERCHANTABLITY OR NON-INFRINGEMENT. 
 
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */



/// <reference no-default-lib="true"/>


interface PromiseConstructor {
    /**
     * A reference to the prototype.
     */
    readonly prototype: Promise<any>;

    /**
     * Creates a new Promise.
     * @param executor A callback used to initialize the promise. This callback is passed two arguments:
     * a resolve callback used to resolve the promise with a value or the result of another promise,
     * and a reject callback used to reject the promise with a provided reason or error.
     */
    new <T>(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>, T10 | PromiseLike<T10>]): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3, T4, T5, T6, T7, T8, T9>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>]): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3, T4, T5, T6, T7, T8>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>]): Promise<[T1, T2, T3, T4, T5, T6, T7, T8]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3, T4, T5, T6, T7>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>]): Promise<[T1, T2, T3, T4, T5, T6, T7]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3, T4, T5, T6>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>]): Promise<[T1, T2, T3, T4, T5, T6]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3, T4, T5>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>, T5 | PromiseLike<T5>]): Promise<[T1, T2, T3, T4, T5]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3, T4>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>]): Promise<[T1, T2, T3, T4]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>]): Promise<[T1, T2, T3]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>]): Promise<[T1, T2]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T>(values: (T | PromiseLike<T>)[]): Promise<T[]>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>, T10 | PromiseLike<T10>]): Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3, T4, T5, T6, T7, T8, T9>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>]): Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3, T4, T5, T6, T7, T8>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>]): Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3, T4, T5, T6, T7>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>]): Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3, T4, T5, T6>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>]): Promise<T1 | T2 | T3 | T4 | T5 | T6>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3, T4, T5>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>]): Promise<T1 | T2 | T3 | T4 | T5>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3, T4>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>]): Promise<T1 | T2 | T3 | T4>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>]): Promise<T1 | T2 | T3>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>]): Promise<T1 | T2>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T>(values: (T | PromiseLike<T>)[]): Promise<T>;

    /**
     * Creates a new rejected promise for the provided reason.
     * @param reason The reason the promise was rejected.
     * @returns A new rejected Promise.
     */
    reject<T = never>(reason?: any): Promise<T>;

    /**
     * Creates a new resolved promise for the provided value.
     * @param value A promise.
     * @returns A promise whose internal state matches the provided promise.
     */
    resolve<T>(value: T | PromiseLike<T>): Promise<T>;

    /**
     * Creates a new resolved promise .
     * @returns A resolved promise.
     */
    resolve(): Promise<void>;
}

declare var Promise: PromiseConstructor;

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved. 
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0  
 
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE, 
MERCHANTABLITY OR NON-INFRINGEMENT. 
 
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */



/// <reference no-default-lib="true"/>


/// <reference lib="es2015.symbol" />

interface SymbolConstructor {
    /**
     * A method that returns the default iterator for an object. Called by the semantics of the
     * for-of statement.
     */
    readonly iterator: symbol;
}

interface IteratorResult<T> {
    done: boolean;
    value: T;
}

interface Iterator<T> {
    next(value?: any): IteratorResult<T>;
    return?(value?: any): IteratorResult<T>;
    throw?(e?: any): IteratorResult<T>;
}

interface Iterable<T> {
    [Symbol.iterator](): Iterator<T>;
}

interface IterableIterator<T> extends Iterator<T> {
    [Symbol.iterator](): IterableIterator<T>;
}

interface Array<T> {
    /** Iterator */
    [Symbol.iterator](): IterableIterator<T>;

    /**
     * Returns an iterable of key, value pairs for every entry in the array
     */
    entries(): IterableIterator<[number, T]>;

    /**
     * Returns an iterable of keys in the array
     */
    keys(): IterableIterator<number>;

    /**
     * Returns an iterable of values in the array
     */
    values(): IterableIterator<T>;
}

interface ArrayConstructor {
    /**
     * Creates an array from an iterable object.
     * @param iterable An iterable object to convert to an array.
     */
    from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];

    /**
     * Creates an array from an iterable object.
     * @param iterable An iterable object to convert to an array.
     * @param mapfn A mapping function to call on every element of the array.
     * @param thisArg Value of 'this' used to invoke the mapfn.
     */
    from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
}

interface ReadonlyArray<T> {
    /** Iterator of values in the array. */
    [Symbol.iterator](): IterableIterator<T>;

    /**
     * Returns an iterable of key, value pairs for every entry in the array
     */
    entries(): IterableIterator<[number, T]>;

    /**
     * Returns an iterable of keys in the array
     */
    keys(): IterableIterator<number>;

    /**
     * Returns an iterable of values in the array
     */
    values(): IterableIterator<T>;
}

interface IArguments {
    /** Iterator */
    [Symbol.iterator](): IterableIterator<any>;
}

interface Map<K, V> {
    /** Returns an iterable of entries in the map. */
    [Symbol.iterator](): IterableIterator<[K, V]>;

    /**
     * Returns an iterable of key, value pairs for every entry in the map.
     */
    entries(): IterableIterator<[K, V]>;

    /**
     * Returns an iterable of keys in the map
     */
    keys(): IterableIterator<K>;

    /**
     * Returns an iterable of values in the map
     */
    values(): IterableIterator<V>;
}

interface ReadonlyMap<K, V> {
    /** Returns an iterable of entries in the map. */
    [Symbol.iterator](): IterableIterator<[K, V]>;

    /**
     * Returns an iterable of key, value pairs for every entry in the map.
     */
    entries(): IterableIterator<[K, V]>;

    /**
     * Returns an iterable of keys in the map
     */
    keys(): IterableIterator<K>;

    /**
     * Returns an iterable of values in the map
     */
    values(): IterableIterator<V>;
}

interface MapConstructor {
    new <K, V>(iterable: Iterable<[K, V]>): Map<K, V>;
}

interface WeakMap<K extends object, V> { }

interface WeakMapConstructor {
    new <K extends object, V>(iterable: Iterable<[K, V]>): WeakMap<K, V>;
}

interface Set<T> {
    /** Iterates over values in the set. */
    [Symbol.iterator](): IterableIterator<T>;
    /**
     * Returns an iterable of [v,v] pairs for every value \`v\` in the set.
     */
    entries(): IterableIterator<[T, T]>;
    /**
     * Despite its name, returns an iterable of the values in the set,
     */
    keys(): IterableIterator<T>;

    /**
     * Returns an iterable of values in the set.
     */
    values(): IterableIterator<T>;
}

interface ReadonlySet<T> {
    /** Iterates over values in the set. */
    [Symbol.iterator](): IterableIterator<T>;

    /**
     * Returns an iterable of [v,v] pairs for every value \`v\` in the set.
     */
    entries(): IterableIterator<[T, T]>;

    /**
     * Despite its name, returns an iterable of the values in the set,
     */
    keys(): IterableIterator<T>;

    /**
     * Returns an iterable of values in the set.
     */
    values(): IterableIterator<T>;
}

interface SetConstructor {
    new <T>(iterable: Iterable<T>): Set<T>;
}

interface WeakSet<T extends object> { }

interface WeakSetConstructor {
    new <T extends object = object>(iterable: Iterable<T>): WeakSet<T>;
}

interface Promise<T> { }

interface PromiseConstructor {
    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<TAll>(values: Iterable<TAll | PromiseLike<TAll>>): Promise<TAll[]>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T>(values: Iterable<T | PromiseLike<T>>): Promise<T>;
}

declare namespace Reflect {
    function enumerate(target: object): IterableIterator<any>;
}

interface String {
    /** Iterator */
    [Symbol.iterator](): IterableIterator<string>;
}

interface Int8Array {
    [Symbol.iterator](): IterableIterator<number>;
    /**
     * Returns an array of key, value pairs for every entry in the array
     */
    entries(): IterableIterator<[number, number]>;
    /**
     * Returns an list of keys in the array
     */
    keys(): IterableIterator<number>;
    /**
     * Returns an list of values in the array
     */
    values(): IterableIterator<number>;
}

interface Int8ArrayConstructor {
    new (elements: Iterable<number>): Int8Array;

    /**
     * Creates an array from an array-like or iterable object.
     * @param arrayLike An array-like or iterable object to convert to an array.
     * @param mapfn A mapping function to call on every element of the array.
     * @param thisArg Value of 'this' used to invoke the mapfn.
     */
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Int8Array;
}

interface Uint8Array {
    [Symbol.iterator](): IterableIterator<number>;
    /**
     * Returns an array of key, value pairs for every entry in the array
     */
    entries(): IterableIterator<[number, number]>;
    /**
     * Returns an list of keys in the array
     */
    keys(): IterableIterator<number>;
    /**
     * Returns an list of values in the array
     */
    values(): IterableIterator<number>;
}

interface Uint8ArrayConstructor {
    new (elements: Iterable<number>): Uint8Array;

    /**
     * Creates an array from an array-like or iterable object.
     * @param arrayLike An array-like or iterable object to convert to an array.
     * @param mapfn A mapping function to call on every element of the array.
     * @param thisArg Value of 'this' used to invoke the mapfn.
     */
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint8Array;
}

interface Uint8ClampedArray {
    [Symbol.iterator](): IterableIterator<number>;
    /**
     * Returns an array of key, value pairs for every entry in the array
     */
    entries(): IterableIterator<[number, number]>;

    /**
     * Returns an list of keys in the array
     */
    keys(): IterableIterator<number>;

    /**
     * Returns an list of values in the array
     */
    values(): IterableIterator<number>;
}

interface Uint8ClampedArrayConstructor {
    new (elements: Iterable<number>): Uint8ClampedArray;


    /**
     * Creates an array from an array-like or iterable object.
     * @param arrayLike An array-like or iterable object to convert to an array.
     * @param mapfn A mapping function to call on every element of the array.
     * @param thisArg Value of 'this' used to invoke the mapfn.
     */
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint8ClampedArray;
}

interface Int16Array {
    [Symbol.iterator](): IterableIterator<number>;
    /**
     * Returns an array of key, value pairs for every entry in the array
     */
    entries(): IterableIterator<[number, number]>;

    /**
     * Returns an list of keys in the array
     */
    keys(): IterableIterator<number>;

    /**
     * Returns an list of values in the array
     */
    values(): IterableIterator<number>;
}

interface Int16ArrayConstructor {
    new (elements: Iterable<number>): Int16Array;

    /**
     * Creates an array from an array-like or iterable object.
     * @param arrayLike An array-like or iterable object to convert to an array.
     * @param mapfn A mapping function to call on every element of the array.
     * @param thisArg Value of 'this' used to invoke the mapfn.
     */
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Int16Array;
}

interface Uint16Array {
    [Symbol.iterator](): IterableIterator<number>;
    /**
     * Returns an array of key, value pairs for every entry in the array
     */
    entries(): IterableIterator<[number, number]>;
    /**
     * Returns an list of keys in the array
     */
    keys(): IterableIterator<number>;
    /**
     * Returns an list of values in the array
     */
    values(): IterableIterator<number>;
}

interface Uint16ArrayConstructor {
    new (elements: Iterable<number>): Uint16Array;

    /**
     * Creates an array from an array-like or iterable object.
     * @param arrayLike An array-like or iterable object to convert to an array.
     * @param mapfn A mapping function to call on every element of the array.
     * @param thisArg Value of 'this' used to invoke the mapfn.
     */
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint16Array;
}

interface Int32Array {
    [Symbol.iterator](): IterableIterator<number>;
    /**
     * Returns an array of key, value pairs for every entry in the array
     */
    entries(): IterableIterator<[number, number]>;
    /**
     * Returns an list of keys in the array
     */
    keys(): IterableIterator<number>;
    /**
     * Returns an list of values in the array
     */
    values(): IterableIterator<number>;
}

interface Int32ArrayConstructor {
    new (elements: Iterable<number>): Int32Array;

    /**
     * Creates an array from an array-like or iterable object.
     * @param arrayLike An array-like or iterable object to convert to an array.
     * @param mapfn A mapping function to call on every element of the array.
     * @param thisArg Value of 'this' used to invoke the mapfn.
     */
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Int32Array;
}

interface Uint32Array {
    [Symbol.iterator](): IterableIterator<number>;
    /**
     * Returns an array of key, value pairs for every entry in the array
     */
    entries(): IterableIterator<[number, number]>;
    /**
     * Returns an list of keys in the array
     */
    keys(): IterableIterator<number>;
    /**
     * Returns an list of values in the array
     */
    values(): IterableIterator<number>;
}

interface Uint32ArrayConstructor {
    new (elements: Iterable<number>): Uint32Array;

    /**
     * Creates an array from an array-like or iterable object.
     * @param arrayLike An array-like or iterable object to convert to an array.
     * @param mapfn A mapping function to call on every element of the array.
     * @param thisArg Value of 'this' used to invoke the mapfn.
     */
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint32Array;
}

interface Float32Array {
    [Symbol.iterator](): IterableIterator<number>;
    /**
     * Returns an array of key, value pairs for every entry in the array
     */
    entries(): IterableIterator<[number, number]>;
    /**
     * Returns an list of keys in the array
     */
    keys(): IterableIterator<number>;
    /**
     * Returns an list of values in the array
     */
    values(): IterableIterator<number>;
}

interface Float32ArrayConstructor {
    new (elements: Iterable<number>): Float32Array;

    /**
     * Creates an array from an array-like or iterable object.
     * @param arrayLike An array-like or iterable object to convert to an array.
     * @param mapfn A mapping function to call on every element of the array.
     * @param thisArg Value of 'this' used to invoke the mapfn.
     */
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Float32Array;
}

interface Float64Array {
    [Symbol.iterator](): IterableIterator<number>;
    /**
     * Returns an array of key, value pairs for every entry in the array
     */
    entries(): IterableIterator<[number, number]>;
    /**
     * Returns an list of keys in the array
     */
    keys(): IterableIterator<number>;
    /**
     * Returns an list of values in the array
     */
    values(): IterableIterator<number>;
}

interface Float64ArrayConstructor {
    new (elements: Iterable<number>): Float64Array;

    /**
     * Creates an array from an array-like or iterable object.
     * @param arrayLike An array-like or iterable object to convert to an array.
     * @param mapfn A mapping function to call on every element of the array.
     * @param thisArg Value of 'this' used to invoke the mapfn.
     */
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Float64Array;
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved. 
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0  
 
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE, 
MERCHANTABLITY OR NON-INFRINGEMENT. 
 
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */



/// <reference no-default-lib="true"/>


interface ProxyHandler<T extends object> {
    getPrototypeOf? (target: T): object | null;
    setPrototypeOf? (target: T, v: any): boolean;
    isExtensible? (target: T): boolean;
    preventExtensions? (target: T): boolean;
    getOwnPropertyDescriptor? (target: T, p: PropertyKey): PropertyDescriptor | undefined;
    has? (target: T, p: PropertyKey): boolean;
    get? (target: T, p: PropertyKey, receiver: any): any;
    set? (target: T, p: PropertyKey, value: any, receiver: any): boolean;
    deleteProperty? (target: T, p: PropertyKey): boolean;
    defineProperty? (target: T, p: PropertyKey, attributes: PropertyDescriptor): boolean;
    enumerate? (target: T): PropertyKey[];
    ownKeys? (target: T): PropertyKey[];
    apply? (target: T, thisArg: any, argArray?: any): any;
    construct? (target: T, argArray: any, newTarget?: any): object;
}

interface ProxyConstructor {
    revocable<T extends object>(target: T, handler: ProxyHandler<T>): { proxy: T; revoke: () => void; };
    new <T extends object>(target: T, handler: ProxyHandler<T>): T;
}
declare var Proxy: ProxyConstructor;

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved. 
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0  
 
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE, 
MERCHANTABLITY OR NON-INFRINGEMENT. 
 
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */



/// <reference no-default-lib="true"/>


declare namespace Reflect {
    function apply(target: Function, thisArgument: any, argumentsList: ArrayLike<any>): any;
    function construct(target: Function, argumentsList: ArrayLike<any>, newTarget?: any): any;
    function defineProperty(target: object, propertyKey: PropertyKey, attributes: PropertyDescriptor): boolean;
    function deleteProperty(target: object, propertyKey: PropertyKey): boolean;
    function get(target: object, propertyKey: PropertyKey, receiver?: any): any;
    function getOwnPropertyDescriptor(target: object, propertyKey: PropertyKey): PropertyDescriptor | undefined;
    function getPrototypeOf(target: object): object;
    function has(target: object, propertyKey: PropertyKey): boolean;
    function isExtensible(target: object): boolean;
    function ownKeys(target: object): PropertyKey[];
    function preventExtensions(target: object): boolean;
    function set(target: object, propertyKey: PropertyKey, value: any, receiver?: any): boolean;
    function setPrototypeOf(target: object, proto: any): boolean;
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved. 
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0  
 
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE, 
MERCHANTABLITY OR NON-INFRINGEMENT. 
 
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */



/// <reference no-default-lib="true"/>


interface SymbolConstructor {
    /**
     * A reference to the prototype.
     */
    readonly prototype: Symbol;

    /**
     * Returns a new unique Symbol value.
     * @param  description Description of the new Symbol object.
     */
    (description?: string | number): symbol;

    /**
     * Returns a Symbol object from the global symbol registry matching the given key if found.
     * Otherwise, returns a new symbol with this key.
     * @param key key to search for.
     */
    for(key: string): symbol;

    /**
     * Returns a key from the global symbol registry matching the given Symbol if found.
     * Otherwise, returns a undefined.
     * @param sym Symbol to find the key for.
     */
    keyFor(sym: symbol): string | undefined;
}

declare var Symbol: SymbolConstructor;
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved. 
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0  
 
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE, 
MERCHANTABLITY OR NON-INFRINGEMENT. 
 
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */



/// <reference no-default-lib="true"/>


/// <reference lib="es2015.symbol" />

interface SymbolConstructor {
    /**
     * A method that determines if a constructor object recognizes an object as one of the
     * constructor’s instances. Called by the semantics of the instanceof operator.
     */
    readonly hasInstance: symbol;

    /**
     * A Boolean value that if true indicates that an object should flatten to its array elements
     * by Array.prototype.concat.
     */
    readonly isConcatSpreadable: symbol;

    /**
     * A regular expression method that matches the regular expression against a string. Called
     * by the String.prototype.match method.
     */
    readonly match: symbol;

    /**
     * A regular expression method that replaces matched substrings of a string. Called by the
     * String.prototype.replace method.
     */
    readonly replace: symbol;

    /**
     * A regular expression method that returns the index within a string that matches the
     * regular expression. Called by the String.prototype.search method.
     */
    readonly search: symbol;

    /**
     * A function valued property that is the constructor function that is used to create
     * derived objects.
     */
    readonly species: symbol;

    /**
     * A regular expression method that splits a string at the indices that match the regular
     * expression. Called by the String.prototype.split method.
     */
    readonly split: symbol;

    /**
     * A method that converts an object to a corresponding primitive value.
     * Called by the ToPrimitive abstract operation.
     */
    readonly toPrimitive: symbol;

    /**
     * A String value that is used in the creation of the default string description of an object.
     * Called by the built-in method Object.prototype.toString.
     */
    readonly toStringTag: symbol;

    /**
     * An Object whose own property names are property names that are excluded from the 'with'
     * environment bindings of the associated objects.
     */
    readonly unscopables: symbol;
}

interface Symbol {
    readonly [Symbol.toStringTag]: string;
}

interface Array<T> {
    /**
     * Returns an object whose properties have the value 'true'
     * when they will be absent when used in a 'with' statement.
     */
    [Symbol.unscopables](): {
        copyWithin: boolean;
        entries: boolean;
        fill: boolean;
        find: boolean;
        findIndex: boolean;
        keys: boolean;
        values: boolean;
    };
}

interface Date {
    /**
     * Converts a Date object to a string.
     */
    [Symbol.toPrimitive](hint: "default"): string;
    /**
     * Converts a Date object to a string.
     */
    [Symbol.toPrimitive](hint: "string"): string;
    /**
     * Converts a Date object to a number.
     */
    [Symbol.toPrimitive](hint: "number"): number;
    /**
     * Converts a Date object to a string or number.
     *
     * @param hint The strings "number", "string", or "default" to specify what primitive to return.
     *
     * @throws {TypeError} If 'hint' was given something other than "number", "string", or "default".
     * @returns A number if 'hint' was "number", a string if 'hint' was "string" or "default".
     */
    [Symbol.toPrimitive](hint: string): string | number;
}

interface Map<K, V> {
    readonly [Symbol.toStringTag]: string;
}

interface WeakMap<K extends object, V> {
    readonly [Symbol.toStringTag]: string;
}

interface Set<T> {
    readonly [Symbol.toStringTag]: string;
}

interface WeakSet<T extends object> {
    readonly [Symbol.toStringTag]: string;
}

interface JSON {
    readonly [Symbol.toStringTag]: string;
}

interface Function {
    /**
     * Determines whether the given value inherits from this function if this function was used
     * as a constructor function.
     *
     * A constructor function can control which objects are recognized as its instances by
     * 'instanceof' by overriding this method.
     */
    [Symbol.hasInstance](value: any): boolean;
}

interface GeneratorFunction {
    readonly [Symbol.toStringTag]: string;
}

interface Math {
    readonly [Symbol.toStringTag]: string;
}

interface Promise<T> {
    readonly [Symbol.toStringTag]: string;
}

interface PromiseConstructor {
    readonly [Symbol.species]: PromiseConstructor;
}

interface RegExp {
    /**
     * Matches a string with this regular expression, and returns an array containing the results of
     * that search.
     * @param string A string to search within.
     */
    [Symbol.match](string: string): RegExpMatchArray | null;

    /**
     * Replaces text in a string, using this regular expression.
     * @param string A String object or string literal whose contents matching against
     *               this regular expression will be replaced
     * @param replaceValue A String object or string literal containing the text to replace for every
     *                     successful match of this regular expression.
     */
    [Symbol.replace](string: string, replaceValue: string): string;

    /**
     * Replaces text in a string, using this regular expression.
     * @param string A String object or string literal whose contents matching against
     *               this regular expression will be replaced
     * @param replacer A function that returns the replacement text.
     */
    [Symbol.replace](string: string, replacer: (substring: string, ...args: any[]) => string): string;

    /**
     * Finds the position beginning first substring match in a regular expression search
     * using this regular expression.
     *
     * @param string The string to search within.
     */
    [Symbol.search](string: string): number;

    /**
     * Returns an array of substrings that were delimited by strings in the original input that
     * match against this regular expression.
     *
     * If the regular expression contains capturing parentheses, then each time this
     * regular expression matches, the results (including any undefined results) of the
     * capturing parentheses are spliced.
     *
     * @param string string value to split
     * @param limit if not undefined, the output array is truncated so that it contains no more
     * than 'limit' elements.
     */
    [Symbol.split](string: string, limit?: number): string[];
}

interface RegExpConstructor {
    readonly [Symbol.species]: RegExpConstructor;
}

interface String {
    /**
     * Matches a string an object that supports being matched against, and returns an array containing the results of that search.
     * @param matcher An object that supports being matched against.
     */
    match(matcher: { [Symbol.match](string: string): RegExpMatchArray | null; }): RegExpMatchArray | null;

    /**
     * Replaces text in a string, using an object that supports replacement within a string.
     * @param searchValue A object can search for and replace matches within a string.
     * @param replaceValue A string containing the text to replace for every successful match of searchValue in this string.
     */
    replace(searchValue: { [Symbol.replace](string: string, replaceValue: string): string; }, replaceValue: string): string;

    /**
     * Replaces text in a string, using an object that supports replacement within a string.
     * @param searchValue A object can search for and replace matches within a string.
     * @param replacer A function that returns the replacement text.
     */
    replace(searchValue: { [Symbol.replace](string: string, replacer: (substring: string, ...args: any[]) => string): string; }, replacer: (substring: string, ...args: any[]) => string): string;

    /**
     * Finds the first substring match in a regular expression search.
     * @param searcher An object which supports searching within a string.
     */
    search(searcher: { [Symbol.search](string: string): number; }): number;

    /**
     * Split a string into substrings using the specified separator and return them as an array.
     * @param splitter An object that can split a string.
     * @param limit A value used to limit the number of elements returned in the array.
     */
    split(splitter: { [Symbol.split](string: string, limit?: number): string[]; }, limit?: number): string[];
}

interface ArrayBuffer {
    readonly [Symbol.toStringTag]: string;
}

interface DataView {
    readonly [Symbol.toStringTag]: string;
}

interface Int8Array {
    readonly [Symbol.toStringTag]: "Int8Array";
}

interface Uint8Array {
    readonly [Symbol.toStringTag]: "UInt8Array";
}

interface Uint8ClampedArray {
    readonly [Symbol.toStringTag]: "Uint8ClampedArray";
}

interface Int16Array {
    readonly [Symbol.toStringTag]: "Int16Array";
}

interface Uint16Array {
    readonly [Symbol.toStringTag]: "Uint16Array";
}

interface Int32Array {
    readonly [Symbol.toStringTag]: "Int32Array";
}

interface Uint32Array {
    readonly [Symbol.toStringTag]: "Uint32Array";
}

interface Float32Array {
    readonly [Symbol.toStringTag]: "Float32Array";
}

interface Float64Array {
    readonly [Symbol.toStringTag]: "Float64Array";
}

interface ArrayConstructor {
    readonly [Symbol.species]: ArrayConstructor;
}
interface MapConstructor {
    readonly [Symbol.species]: MapConstructor;
}
interface SetConstructor {
    readonly [Symbol.species]: SetConstructor;
}
interface ArrayBufferConstructor {
    readonly [Symbol.species]: ArrayBufferConstructor;
}
  `)

  /* global prettier, plugins */


// MAIN //

monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
  noLib: true,
  allowNonTsExtensions: true,
  strictNullChecks: true
})

const editor = monaco.editor.create(document.getElementById('editor'), {
  language: 'javascript',
  minimap: {
    enabled: false
  },
  scrollBeyondLastLine: false
})

editor.getModel().updateOptions({ tabSize: 2 })
editor.focus()

/// ///////

document.getElementById('copy').onclick = () => {
  editor.focus()
  const p = editor.getPosition()

  editor.setSelection(editor.getModel().getFullModelRange())
  document.execCommand('copy')

  editor.setPosition(p) // clears selection
  const t = document.getElementById('copied-text')
  t.style.opacity = '1'

  setTimeout(() => (t.style.opacity = '0'), 2000)
}

document.getElementById('pretty').onclick = () => {
  const text = editor.getModel().getValue()
  const res = prettier.format(text, { parser: 'babel', plugins })

  editor.getModel().setValue(res)
}

})

