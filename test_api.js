
const https = require('https');

// Test Genesis 1
const codes = ['ARNA', 'SVD', 'AR', 'ARB'];

codes.forEach(code => {
    const url = `https://bolls.life/get-text/${code}/1/1/`;
    console.log(`Testing ${code}...`);

    https.get(url, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            if (data.includes('God') || data.includes('الله')) {
                console.log(`✅ SUCCESS: ${code} looks valid.`);
                console.log(data.substring(0, 50));
            } else {
                console.log(`❌ FAILED: ${code} returned: ${data.substring(0, 50)}...`);
            }
        });
    }).on('error', (e) => {
        console.log(`❌ ERROR: ${code} - ${e.message}`);
    });
});
