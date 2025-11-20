# Contributing Guidelines

## Development Setup

1. Fork the repository
2. Clone your fork
3. Install dependencies: `npm install`
4. Create a feature branch: `git checkout -b feature/your-feature`
5. Make your changes
6. Run tests: `npm test`
7. Run linter: `npm run lint`
8. Commit your changes: `git commit -m "Add your feature"`
9. Push to your fork: `git push origin feature/your-feature`
10. Create a Pull Request

## Code Style

- Use TypeScript for all new code
- Follow ESLint rules
- Use Prettier for formatting
- Write tests for new features
- Document complex logic

## Testing

- Write unit tests for utilities
- Write integration tests for workflows
- Write E2E tests for user flows
- Aim for >80% code coverage

## Commit Messages

Use conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance

## Pull Request Process

1. Ensure all tests pass
2. Update documentation if needed
3. Add changelog entry
4. Request review from maintainers

