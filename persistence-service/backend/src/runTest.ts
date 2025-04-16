import fetch from 'node-fetch';

async function testPostApi(name: string, description: string, expectedStatus: number, expectedMessage: string) {
  const response = await fetch(`http://localhost:8081/bearphoto/${name}/${description}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  const result = await response.text();

  if (response.status === expectedStatus && result.includes(expectedMessage)) {
    console.log(`✅ Test Passed: name="${name}"`);
    console.log(`Expected: (${expectedStatus}) "${expectedMessage}"`);
    console.log(`Received: (${response.status}) "${result}"`);
  } else {
    console.error(`❌ Test Failed: name="${name}"`);
    console.error(`Expected: (${expectedStatus}) "${expectedMessage}"`);
    console.error(`Received: (${response.status}) "${result}"`);
  }
}

async function runTests() {
  console.log("🔍 Running integration tests...");

  await testPostApi("bearphoto", "desc", 200, "This operation was successful.");
  await testPostApi("cat", "desc", 302, "is not a valid name");
  await testPostApi(" ", "desc", 400, "The name is empty.");
  await testPostApi("elephant", "desc", 302, "is not a valid name");

  console.log("✅ All tests executed.");
}

runTests().catch(console.error);
