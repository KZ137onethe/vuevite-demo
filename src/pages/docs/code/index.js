export function conversionMarkdown(string, language) {
  return "```" + `${language} ${JSON.stringify(string, null, 2).slice(1, -1)}` + "```"
}
