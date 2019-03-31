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
