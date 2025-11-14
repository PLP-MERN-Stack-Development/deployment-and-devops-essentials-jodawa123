# Health Check Monitoring Setup

## Overview

The application includes a health check endpoint at `/health` that can be used for monitoring and uptime checks.

## Health Check Endpoint

### Endpoint
```
GET /health
```

### Response
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 12345.67,
  "environment": "production"
}
```

### Status Codes
- `200 OK`: Service is healthy
- `503 Service Unavailable`: Service is down (if implemented)

## Monitoring Services

### Option 1: UptimeRobot (Free)

1. **Sign Up**
   - Go to [uptimerobot.com](https://uptimerobot.com)
   - Create a free account

2. **Add Monitor**
   - Click "Add New Monitor"
   - Monitor Type: HTTP(s)
   - Friendly Name: MERN Backend API
   - URL: `https://your-backend-url.onrender.com/health`
   - Monitoring Interval: 5 minutes
   - Click "Create Monitor"

3. **Set Up Alerts**
   - Configure email/SMS alerts
   - Set up status pages

### Option 2: Pingdom

1. **Sign Up**
   - Go to [pingdom.com](https://www.pingdom.com)
   - Create account

2. **Add Check**
   - Click "Add New Check"
   - Check Type: HTTP
   - URL: `https://your-backend-url.onrender.com/health`
   - Check Interval: 1 minute
   - Save

### Option 3: StatusCake

1. **Sign Up**
   - Go to [statuscake.com](https://www.statuscake.com)
   - Create account

2. **Add Test**
   - Click "Add Test"
   - Test Type: HTTP
   - Website URL: `https://your-backend-url.onrender.com/health`
   - Check Rate: 5 minutes
   - Save

## Custom Monitoring Script

You can also create a custom monitoring script:

```javascript
// monitor.js
const axios = require('axios');

const checkHealth = async () => {
  try {
    const response = await axios.get('https://your-backend-url.onrender.com/health');
    if (response.data.status === 'OK') {
      console.log('✅ Service is healthy');
    } else {
      console.error('❌ Service is unhealthy');
    }
  } catch (error) {
    console.error('❌ Health check failed:', error.message);
  }
};

// Run every 5 minutes
setInterval(checkHealth, 5 * 60 * 1000);
checkHealth(); // Run immediately
```

## Integration with CI/CD

You can add health checks to your CI/CD pipeline:

```yaml
# .github/workflows/health-check.yml
name: Health Check

on:
  schedule:
    - cron: '*/5 * * * *'  # Every 5 minutes
  workflow_dispatch:

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - name: Check Backend Health
        run: |
          response=$(curl -s -o /dev/null -w "%{http_code}" https://your-backend-url.onrender.com/health)
          if [ $response -eq 200 ]; then
            echo "✅ Backend is healthy"
          else
            echo "❌ Backend health check failed"
            exit 1
          fi
```

## Best Practices

1. **Monitor Multiple Endpoints**
   - Health check endpoint
   - Main API endpoint
   - Database connectivity

2. **Set Appropriate Intervals**
   - Production: 1-5 minutes
   - Development: 15-30 minutes

3. **Configure Alerts**
   - Email notifications
   - SMS alerts for critical issues
   - Slack/Discord webhooks

4. **Document Response Times**
   - Track average response time
   - Set up alerts for slow responses

5. **Status Page**
   - Create a public status page
   - Show current status
   - Display uptime statistics

## Example Status Page

You can create a simple status page:

```html
<!DOCTYPE html>
<html>
<head>
  <title>API Status</title>
</head>
<body>
  <h1>API Status</h1>
  <div id="status">Checking...</div>
  <script>
    fetch('https://your-backend-url.onrender.com/health')
      .then(res => res.json())
      .then(data => {
        document.getElementById('status').innerHTML = 
          `Status: ${data.status}<br>
           Uptime: ${Math.floor(data.uptime)}s<br>
           Environment: ${data.environment}`;
      });
  </script>
</body>
</html>
```


