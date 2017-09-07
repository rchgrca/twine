export const setMultiLineTruncate = (text, maxlength) => {
  // uses JS solution because pure CSS solutions are not cross-browser reliable
  const ellipsis = text.length > maxlength ? '...' : ''
  return `${text.substring(0, maxlength)}${ellipsis}`
}
