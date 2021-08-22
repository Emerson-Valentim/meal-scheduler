export default abstract class Utils {
  public static capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  public static mapKeys(model, data) {
    Object.entries(data).forEach(([key, value]) => {
      model[key] = value
    })
  }
}