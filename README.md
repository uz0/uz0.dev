# uz0.dev

Content aggregator portal for the uz0.dev community - future entry point for members. A Habr-like platform with limited author access (donors) and aggregated content from various sources.

## MVP

A Dockerized solution that aggregates content from social networks and RSS feeds, transforming it into a unified feed with tagged materials (articles, videos, podcasts).

## Architecture

- **Frontend**: Renders widgets from feed + static markup + caching
- **Backend**: Cron jobs with adapters for data sources
- **Sources**: RSS, Habr, Medium, YouTube, Telegraph
- **Formats**: Articles, videos, podcasts tagged by language, platform, and author

## Development

The `/docs` directory with GitHub Pages deployment is a temporary setup and currently under development.
