<h1>Overloan RPC Performance Testing</h1>

<h2>Table of Contents</h2>

<ul>
<li><a href="#overview">Overview</a></li>
<li><a href="#test-scenarios">Test Scenarios</a></li>
<li><a href="#prerequisites">Prerequisites</a></li>
<li><a href="#install-nodejs">Install Node.js</a></li>
<li><a href="#install-k6">Install k6</a></li>
<li><a href="#install-project-dependencies">Install Project Dependencies</a></li>
<li><a href="#run-the-cosmos-sdk-node">Run the Cosmos SDK Node</a></li>
<li><a href="#configure-rpc-endpoint">Configure RPC Endpoint</a></li>
<li><a href="#build-test-scripts">Build Test Scripts</a></li>
<li><a href="#running-tests">Running Tests</a>
    <ul>
        <li><a href="#load-test">Load Test</a></li>
        <li><a href="#stress-test">Stress Test</a></li>
        <li><a href="#spike-test">Spike Test</a></li>
        <li><a href="#soak-test">Soak Test</a></li>
    </ul>
</li>
<li><a href="#dev-version-vs-production-version">Dev Version vs Production Version</a>
    <ul>
        <li><a href="#dev-version">Dev Version</a></li>
        <li><a href="#production-version">Production Version</a></li>
        <li><a href="#how-to-activate">How to Activate</a></li>
    </ul>
</li>
<li><a href="#metrics-monitored">Metrics Monitored</a></li>
<li><a href="#example-k6-output">Example k6 Output</a></li>
<li><a href="#best-practices">Best Practices</a></li>
</ul>

<hr/>

<h2 id="overview">Overview</h2>

<p>
This project is designed to perform <b>performance testing</b> on Cosmos SDK RPC endpoints using <b>k6</b>.
The tests simulate different traffic patterns to evaluate the stability and scalability of a Cosmos node.
</p>

<p>The following RPC endpoints are tested:</p>

<ul>
<li>/status</li>
<li>/block</li>
<li>/validators</li>
<li>/net_info</li>
<li>/block_results</li>
</ul>

<p>
Each request randomly selects one of these endpoints to simulate realistic RPC traffic.
</p>

<hr/>

<h2 id="test-scenarios">Test Scenarios</h2>

<ul>
<li><b>Load Test</b> — Simulates gradually increasing traffic to measure system performance under normal usage.</li>
<li><b>Stress Test</b> — Pushes the system beyond its limits to determine the maximum capacity.</li>
<li><b>Spike Test</b> — Simulates sudden traffic spikes to evaluate how the system reacts.</li>
<li><b>Soak Test</b> — Runs the system under sustained load for an extended period to detect stability issues.</li>
</ul>

<hr/>

<h2 id="prerequisites">Prerequisites</h2>

<p>Make sure the following tools are installed:</p>

<ul>
<li>Node.js (>= 18 LTS)</li>
<li>npm</li>
<li>k6</li>
<li>A running Cosmos SDK node</li>
</ul>

<hr/>

<h2 id="install-nodejs">Install Node.js</h2>

<h3 id="install-nodejs-windows">Windows</h3>

<p>
Download the official Node.js LTS installer from:
</p>

<p>
<a href="https://nodejs.org/en/download" target="_blank">
https://nodejs.org/en/download
</a>
</p>

<p>
Install the <b>LTS version</b> using the Windows installer (.msi) and follow the setup wizard.
</p>

<p>Verify installation:</p>

<pre>
node -v
npm -v
</pre>

<hr/>

<h3>Linux (Ubuntu)</h3>

<pre>
sudo apt update
sudo apt install nodejs npm -y
</pre>

<p>Verify installation:</p>

<pre>
node -v
npm -v
</pre>

<h3>MacOS</h3>

<p>Using Homebrew:</p>

<pre>
brew install node
</pre>

<hr/>

<h2 id="install-k6">Install k6</h2>

<h3 id="install-k6-windows">Windows</h3>

<p>
Download the official k6 Windows installer from:
</p>

<p>
<a href="https://k6.io/docs/get-started/installation/#windows" target="_blank">
https://k6.io/docs/get-started/installation/#windows
</a>
</p>

<p>
Download the <b>.msi installer</b> and follow the installation wizard.
</p>

<p>Verify installation:</p>

<pre>
k6 version
</pre>

<hr/>

<h3 id="install-k6-linux">Linux</h3>

<pre>
sudo gpg -k
sudo gpg --no-default-keyring \
--keyring /usr/share/keyrings/k6-archive-keyring.gpg \
--keyserver hkp://keyserver.ubuntu.com:80 \
--recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69

echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] \
https://dl.k6.io/deb stable main" | \
sudo tee /etc/apt/sources.list.d/k6.list

sudo apt update
sudo apt install k6
</pre>

<p>Verify installation:</p>

<pre>
k6 version
</pre>

<hr/>

<h3 id="install-k6-macos">MacOS</h3>

<p>Using Homebrew:</p>

<pre>
brew install k6
</pre>

<p>Verify installation:</p>

<pre>
k6 version
</pre>

<hr/>

<h2 id="install-project-dependencies">Install Project Dependencies</h2>

<p>Clone the repository and install dependencies:</p>

<pre>
git clone &lt;repository-url&gt;
cd overloan-test
npm install
</pre>

<p>Main dependencies used:</p>

<ul>
<li>TypeScript</li>
<li>esbuild</li>
<li>@types/k6</li>
</ul>

<hr/>

<h2 id="run-cosmos-node">Run the Cosmos SDK Node</h2>

<p>
Before running performance tests, ensure that the Cosmos node is running.
</p>

<p>Example command:</p>

<pre>
chaind start
</pre>

<p>By default, Cosmos RPC runs on:</p>

<pre>
http://localhost:26657
</pre>

<p>Test the RPC endpoint:</p>

<pre>
curl http://localhost:26657/status
</pre>

<p>
If the response is returned, the RPC server is working correctly.
</p>

<hr/>

<h2 id="configure-rpc-endpoint">Configure RPC Endpoint</h2>

<p>Edit the configuration file:</p>

<pre>
config/config.ts
</pre>

<p>Example:</p>

<pre>
export const RPC_URL = "http://localhost:26657"
</pre>

<p>
Change this value if you are testing against a remote node.
</p>

<hr/>

<h2 id="build-test-scripts">Build Test Scripts</h2>

<p>
All TypeScript test scripts must be bundled before execution.
</p>

<p>Run:</p>

<pre>
npm run build
</pre>

<p>
This compiles the scripts into the <b>dist</b> directory using <b>esbuild</b>.
</p>

<hr/>

<h2 id="running-tests">Running Tests</h2>

<p>
Each test scenario can be executed using npm scripts.
</p>

<hr/>

<h3 id="load-test">Load Test</h3>

<pre>
npm run load
</pre>

<p>Purpose:</p>

<ul>
<li>Measure system performance under gradually increasing traffic</li>
<li>Simulate normal usage patterns</li>
</ul>

<hr/>

<h3 id="stress-test">Stress Test</h3>

<pre>
npm run stress
</pre>

<p>Purpose:</p>

<ul>
<li>Identify the system's breaking point</li>
<li>Determine maximum supported traffic</li>
</ul>

<hr/>

<h3 id="spike-test">Spike Test</h3>

<pre>
npm run spike
</pre>

<p>Purpose:</p>

<ul>
<li>Test system resilience against sudden traffic spikes</li>
<li>Evaluate system recovery behavior</li>
</ul>

<hr/>

<h3 id="soak-test">Soak Test</h3>

<pre>
npm run soak
</pre>

<p>Purpose:</p>

<ul>
<li>Evaluate long-term system stability</li>
<li>Detect memory leaks or performance degradation</li>
</ul>

<hr/>

<h2 id="dev-vs-prod">Dev Version vs Production Version</h2>

<p>Each test file contains two configurations:</p>

<ul>
<li><b>Dev Version</b></li>
<li><b>Production Version</b></li>
</ul>

<hr/>

<h3 id="dev-version">Dev Version</h3>

<p>
Used during development and debugging.
</p>

<p>Characteristics:</p>

<ul>
<li>Short test duration</li>
<li>Lower number of virtual users</li>
<li>Quick execution</li>
<li>Suitable for local environments</li>
</ul>

<p>Example:</p>

<pre>
duration: "10m"
vus: 200
</pre>

<p>Use Dev mode when:</p>

<ul>
<li>Testing scripts</li>
<li>Debugging test logic</li>
<li>Running tests on local nodes</li>
</ul>

<hr/>

<h3 id="production-version">Production Version</h3>

<p>
Used for realistic performance testing on staging or production environments.
</p>

<p>Characteristics:</p>

<ul>
<li>Longer test duration</li>
<li>Higher number of virtual users</li>
<li>Simulates real-world traffic</li>
</ul>

<p>Example:</p>

<pre>
duration: "6h"
vus: 200
</pre>

<p>
Or multi-stage traffic ramps reaching thousands of users.
</p>

<hr/>

<h3 id="how-to-activate">How to Activate</h3>

<p>
Each test file contains both configurations.
</p>

<p>Example:</p>

<pre>
export const options = {
  vus: 200,
  duration: "10m"
}
</pre>

<p>To enable the production version:</p>

<ul>
<li>Uncomment the <b>Prod Version</b> configuration</li>
<li>Comment the <b>Dev Version</b> configuration</li>
</ul>

<p>Example:</p>

<pre>
export const options = {
  vus: 200,
  duration: "6h"
}
</pre>

<hr/>

<h2 id="metrics-monitored">Metrics Monitored</h2>

<p>k6 generates several important metrics:</p>

<ul>
<li><b>http_req_duration</b> — request latency</li>
<li><b>http_req_failed</b> — failed request rate</li>
<li><b>vus</b> — active virtual users</li>
<li><b>iterations</b> — number of completed requests</li>
</ul>

<p>Example thresholds used:</p>

<pre>
http_req_failed: rate &lt; 1%
http_req_duration: p(95) &lt; 500ms
</pre>

<p>Meaning:</p>

<ul>
<li>Error rate must remain below 1%</li>
<li>95% of requests must complete under 500ms</li>
</ul>

<hr/>

<h2 id="example-k6-output">Example k6 Output</h2>

<pre>
checks.........................: 100.00%
http_req_duration.............: avg=120ms p(95)=320ms
http_req_failed...............: 0.00%
iterations....................: 12000
vus...........................: 300
</pre>

<hr/>

<h2 id="best-practices">Best Practices</h2>

<ul>
<li>Always start the Cosmos node before running tests</li>
<li>Use the Dev configuration during development</li>
<li>Use Production configuration only in staging/testnet environments</li>
<li>Avoid running heavy tests directly on production without coordination</li>
</ul>
