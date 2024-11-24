# Performance Monitoring Project

## Overview

This project implements a monitoring system with two services, **Service A** and **Service B**, designed to simulate and analyze service performance. It adheres to best practices and includes modular code, robust error handling, and automated data management.

---

## Features

### Service A
- Provides a single API endpoint (`/ping`) that simulates varying response times (20ms to 5000ms).
- Configuration:
    - Port number and response time range are configurable via `.env` or command-line arguments.

### Service B
- Tracks response times from Service A and calculates performance statistics:
    - Minimum, maximum, and average response times for the last N requests.
    - Overall uptime, average, minimum, and maximum response times since service start.
- Saves statistics to JSON files every 5 minutes:
    - File hierarchy: `data/<day>/<hour>/<ISO8601-timestamp>.json`.
    - Data older than 2 days is automatically deleted.
- Provides an API endpoint (`/stats`) to retrieve real-time statistics.

---

## Requirements

- **Node.js**: Version 14 or higher
- **NPM**: Installed with Node.js
- **Git**
