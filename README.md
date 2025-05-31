# Ryff PWB Assessment System

A comprehensive system for administering and analyzing Ryff Psychological Well-being Scale assessments across departments and student groups.

## Features

- **Dashboard**: View key metrics, risk alerts, and visualize well-being scores across departments
- **Bulk Assignment**: Distribute assessments to specific classes, departments, or custom groups
- **Auto-Reminders**: Configure automated follow-ups for incomplete assessments
- **Status Monitor**: Track assessment completion progress in real-time
- **Reports**: Generate and export individual or group well-being reports
- **Settings**: User profile and system configuration management

## Tech Stack

- **Frontend**: React 19, Next.js 15
- **UI Components**: Custom components with Tailwind CSS
- **Charts**: Recharts for data visualization
- **State Management**: React Hooks

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or pnpm package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ryff-pwb-system.git
   cd ryff-pwb-system
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

1. Build the application:
   ```bash
   npm run build
   # or
   pnpm build
   ```

2. Start the production server:
   ```bash
   npm run start
   # or
   pnpm start
   ```

## System Architecture

The application is structured as follows:

- `/app`: Next.js app directory with page layouts and routing
- `/components`: React components organized by feature
- `/components/ui`: Reusable UI components
- `/hooks`: Custom React hooks
- `/lib`: Utility functions and helpers
- `/public`: Static assets

## Usage Guide

### Dashboard

The dashboard provides an overview of assessment metrics with:
- Risk alerts for departments and subscales requiring attention
- Department assessment statistics
- Interactive chart for comparing well-being dimensions across departments
- Trend analysis showing changes over time

### Bulk Assignment

To distribute assessments:
1. Navigate to the Bulk Assignment page
2. Enter an assignment name
3. Select target groups (classes or departments)
4. Choose immediate dispatch or schedule for later
5. Select the Ryff Scale version (84, 54, or 42 items)
6. Customize the invitation message
7. Preview and send the assessment

### Auto-Reminders

Configure automated follow-ups:
1. Enable/disable reminders globally
2. Set time intervals for reminders (e.g., 3 days after assignment)
3. Configure maximum number of reminders per user
4. Customize reminder message templates
5. View logs of sent reminders

### Status Monitor

Track assessment progress:
1. Filter by role, status, or group
2. Search for specific users
3. View completion rates and submission dates
4. Send manual reminders to non-responders
5. Access detailed completion statistics

### Reports

Generate insights:
1. Choose report type (individual, group, department, comparative)
2. Select date range and target groups
3. Choose export format (PDF, Excel, CSV)
4. Preview and download reports

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Ryff Psychological Well-being Scale developed by Carol D. Ryff
- UI components inspired by shadcn/ui