export default abstract class Utils {
  public static capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}