var ele = document.createElement("script");
var scriptPath = "http://localhost:8080/{scriptfilename}.js" //verify the script path
ele.setAttribute("src",scriptPath);
document.head.appendChild(ele)