import { useState } from 'react'

export default function CodeSnippets({ 
  apiKey = 'pk_live_YOUR_KEY', 
  toEmail = 'user@example.com', 
  templateName = 'welcome', 
  variablesText = '{\n  "name": "Developer"\n}' 
}) {
  const [activeLang, setActiveLang] = useState('Node.js')
  const apiUrl = 'https://api.plugmail.com/send' // Replace with your actual prod URL later

  const langs = ['Node.js', 'cURL', 'Python', 'Go', 'PHP']

  // Ensure valid JSON for snippets
  let safeVars = variablesText;
  if (!safeVars || safeVars.trim() === '') {
    safeVars = '{}';
  }

  const getSnippet = () => {
    switch (activeLang) {
      case 'Node.js':
        return `const response = await fetch('${apiUrl}', {
  method: 'POST',
  headers: {
    'x-api-key': '${apiKey}',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    to: '${toEmail}',
    template: '${templateName}',
    variables: ${safeVars.replace(/\n/g, '\n    ')}
  })
});

const data = await response.json();
console.log(data);`
      
      case 'cURL':
        return `curl -X POST ${apiUrl} \\
  -H "x-api-key: ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "${toEmail}",
    "template": "${templateName}",
    "variables": ${safeVars.replace(/\n/g, '\n      ')}
  }'`
      
      case 'Python':
        return `import requests

url = "${apiUrl}"
headers = {
    "x-api-key": "${apiKey}",
    "Content-Type": "application/json"
}
data = {
    "to": "${toEmail}",
    "template": "${templateName}",
    "variables": ${safeVars.replace(/\n/g, '\n    ')}
}

response = requests.post(url, json=data, headers=headers)
print(response.json())`

      case 'Go':
        return `package main

import (
\t"bytes"
\t"fmt"
\t"net/http"
\t"io/ioutil"
)

func main() {
\turl := "${apiUrl}"
\t
\tpayload := []byte(\`{
\t\t"to": "${toEmail}",
\t\t"template": "${templateName}",
\t\t"variables": ${safeVars.replace(/\n/g, '\n\t\t')}
\t}\`)

\treq, _ := http.NewRequest("POST", url, bytes.NewBuffer(payload))
\treq.Header.Set("x-api-key", "${apiKey}")
\treq.Header.Set("Content-Type", "application/json")

\tclient := &http.Client{}
\tresp, _ := client.Do(req)
\tdefer resp.Body.Close()

\tbody, _ := ioutil.ReadAll(resp.Body)
\tfmt.Println(string(body))
}`

      case 'PHP':
        return `<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => '${apiUrl}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS => json_encode(array(
    "to" => "${toEmail}",
    "template" => "${templateName}",
    "variables" => json_decode('${safeVars.replace(/\n/g, '')}', true)
  )),
  CURLOPT_HTTPHEADER => array(
    'x-api-key: ${apiKey}',
    'Content-Type: application/json'
  ),
));

$response = curl_exec($curl);
curl_close($curl);
echo $response;`

      default:
        return ''
    }
  }

  return (
    <div className="bg-[#1E293B] rounded-md overflow-hidden h-full flex flex-col">
      <div className="flex px-4 pt-2 border-b border-[#334155] gap-1 overflow-x-auto">
        {langs.map(lang => (
          <button
            key={lang}
            onClick={() => setActiveLang(lang)}
            className={\`px-3 py-2 text-sm font-mono transition-colors border-b-2 whitespace-nowrap \${
              activeLang === lang 
                ? 'text-[#38BDF8] border-[#38BDF8]' 
                : 'text-[#94A3B8] border-transparent hover:text-[#CBD5E1]'
            }\`}
          >
            {lang}
          </button>
        ))}
      </div>
      <div className="p-4 overflow-auto flex-1 relative group">
        <button 
          onClick={() => navigator.clipboard.writeText(getSnippet())}
          className="absolute top-4 right-4 bg-[#334155] hover:bg-[#475569] text-white p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity"
          title="Copy code"
        >
          <span className="material-symbols-outlined text-[16px]">content_copy</span>
        </button>
        <pre className="text-sm text-[#E2E8F0] font-mono leading-relaxed m-0">
          <code>{getSnippet()}</code>
        </pre>
      </div>
    </div>
  )
}
