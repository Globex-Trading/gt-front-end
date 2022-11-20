# GT Frontend

<h1>How to run?</h1>
<ol>
<li>Clone the repository.</li>
<li>Run the command <code>npm install</code> to install dependencies.</li>
<li>Open <code>src/config.json</code> and edit the <code>apiURL</code> & <code>wsURL</code> accordingly.<br>
    <ul>
    <li><code>apiURL</code> is the URL of the API server.</li>
    <li><code>wsURL</code> is the URL of the WebSocket server.</li>
    </ul>
</li>
<li>Use <code>npm start</code> command to start the application.</li>
<li><b><i>[OPTIONAL]</i></b> If you want to compile and bundle the application, 
use the command <code>CI=false DISABLE_ESLINT_PLUGIN=true npm run build --if-present</code></li>
</ol>