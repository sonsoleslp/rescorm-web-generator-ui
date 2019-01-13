import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import FileSaver from 'file-saver';

export const generatePackage  = (state) => {
    let zip_title = "scorm.zip"
 
    JSZipUtils.getBinaryContent(state.scormVersion === "2004" ? "scorm2004.zip":"scorm12.zip", function(err, data) {
        if (err) {
            throw err; // or handle err
        }
        JSZip.loadAsync(data).then(function(zip) {
        	console.log(zip)
        	let indexContent = generateIndex(state)
			zip.file('index.html', indexContent);
            if (state.moodleXmlPath) {
                zip.file("assets/test2.xml", decode(state.moodleXmlPath));
            } 
			zip.generateAsync({ type: "blob" }).then(function(blob) {
                FileSaver.saveAs(blob, state.title.toLowerCase().replace(/\s/g, '') + Math.round(+new Date() / 1000) + (state.scormVersion === "2004" ? "_2004" : "_1.2") + ".zip");
            });
        }) 
    });
 

}
function decode(input) {
    return window.atob(input.slice(21));
}

function generateIndex(state) {
	return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>RESCORM Boilerplate</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
 </head>
<body>
<div id="root"></div>
<script> window.config=JSON.parse('${JSON.stringify({...state, content: undefined, moodleXmlPath: undefined})}');</script>
<script type="text/javascript" src="bundle.js"></script>
</body>
</html>`;
}