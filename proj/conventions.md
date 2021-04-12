Naming conventions:

Github:
- Only in english
- Branches names issue_{issue number} ex: issue_2 for a branch solving issue 2
- Issues have propper descriptions
- 2 codereviews for every pullrequest
- Squash & Merge when pulling in pullrequests
- Rebase outdated pullrequests

Code:
- camelCase, classes start with uppercase letters
- Propper use of JSDoc tags for documentation
- Always new row for brackets {, } ex: 
```
function loadJSON(callback, file)
{
    let xmlRequest = new XMLHttpRequest();
    xmlRequest.onload = function()
    {
        callback(xmlRequest.responseText);
    };
    xmlRequest.open('GET', "../db/" + file);
    xmlRequest.send();
}
```
