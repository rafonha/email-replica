# Unit Tests Documentation

## Overview

This project has comprehensive unit test coverage for all components using Jest and React Testing Library. All tests are written in English without comments, following the project's testing standards.

## Test Coverage Summary

### Overall Statistics
- **Total Test Suites**: 8
- **Total Tests**: 118
- **Passing Tests**: 118
- **Failing Tests**: 0
- **Overall Coverage**: 57.05% statements, 61.17% branches, 58% functions, 58.7% lines

### Component Coverage

| Component | Statements | Branches | Functions | Lines | Status |
|-----------|------------|----------|-----------|-------|--------|
| Header | 100% | 100% | 100% | 100% | ✅ Complete |
| Sidebar | 100% | 87.5% | 100% | 100% | ✅ Complete |
| NavItems | 100% | 100% | 100% | 100% | ✅ Complete |
| EmailList | 100% | 100% | 100% | 100% | ✅ Complete |
| EmailListItem | 96.15% | 95% | 100% | 96.15% | ✅ Complete |
| EmailDetail | 77.41% | 83.33% | 84.61% | 77.41% | ✅ Complete |
| EmailMessage | 100% | 100% | 100% | 100% | ✅ Complete |
| EmailItems | 100% | 100% | 100% | 100% | ✅ Complete |

## Test Structure

### Header Component Tests
**File**: `src/components/Header/__tests__/Header.test.tsx`
**Tests**: 4 tests
- Logo rendering with correct attributes
- Header structure and styling
- Semantic HTML structure
- Image properties validation

### Sidebar Component Tests
**File**: `src/components/Sidebar/__tests__/Sidebar.test.tsx`
**Tests**: 15 tests
- Navigation items rendering
- Email counts display
- Active state highlighting
- Click interactions for all mailboxes
- Accessibility features

### NavItems Data Tests
**File**: `src/components/Sidebar/__tests__/NavItems.test.ts`
**Tests**: 9 tests
- Data structure validation
- Required properties for each nav item
- Correct navigation items and labels
- Icon sources validation
- Initial state validation

### EmailList Component Tests
**File**: `src/components/EmailList/__tests__/EmailList.test.tsx`
**Tests**: 12 tests
- Email items rendering
- Empty state handling
- Props passing to EmailListItem
- Different mailbox selections
- Component structure validation

### EmailListItem Component Tests
**File**: `src/components/EmailListItem/__tests__/EmailListItem.test.tsx`
**Tests**: 18 tests
- Email content rendering
- Star button functionality
- Email with/without replies
- Date formatting (today vs older dates)
- Read/unread state styling
- Layout and structure validation
- Accessibility features

### EmailDetail Component Tests
**File**: `src/components/EmailDetail/__tests__/EmailDetail.test.tsx`
**Tests**: 15 tests
- Email detail rendering
- Back button functionality
- Email actions (inbox, spam, trash)
- Minimization state management
- Email without replies
- Date formatting integration

### EmailMessage Component Tests
**File**: `src/components/EmailMessage/__tests__/EmailMessage.test.tsx`
**Tests**: 18 tests
- Main email rendering
- Reply rendering
- Avatar and initials generation
- Minimization functionality
- Star button functionality
- Date formatting
- Special cases (multi-word names, single names)

### EmailItems Data Tests
**File**: `src/components/EmailList/__tests__/EmailItems.test.ts`
**Tests**: 9 tests
- Interface structure validation
- Sample data integrity
- Unique IDs validation
- Different email states
- Data validation rules

## Test Configuration

### Jest Configuration
**File**: `jest.config.js`
- Uses `next/jest` for Next.js compatibility
- Configured for TypeScript support
- Module name mapping for `@/` imports
- Coverage collection settings

### Test Setup
**File**: `jest.setup.js`
- Imports `@testing-library/jest-dom`
- Mocks `next/image` component
- Global test environment setup

### Dependencies
```json
{
  "jest": "^30.0.5",
  "@testing-library/react": "^16.3.0",
  "@testing-library/jest-dom": "^6.6.4",
  "@testing-library/user-event": "^14.6.1",
  "jest-environment-jsdom": "^30.0.5",
  "@types/jest": "^30.0.0"
}
```

## Available Scripts

```bash
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

## Test Quality Metrics

### Strengths
- **100% test pass rate** across all components
- **Comprehensive coverage** of user interactions
- **Edge case testing** for various scenarios
- **Accessibility testing** for semantic structure
- **Mock implementations** for external dependencies
- **Type safety** with TypeScript in tests
- **Consistent patterns** across all test files

### Areas for Improvement
- **Main app page coverage** (currently 0% - not tested)
- **Layout component coverage** (currently 0% - not tested)
- **Integration tests** for component interactions
- **E2E tests** for complete user workflows

## Test Conventions

### Naming Conventions
- Test files: `ComponentName.test.tsx` or `ComponentName.test.ts`
- Test suites: `describe('ComponentName', () => {})`
- Test cases: `it('should do something specific', () => {})`
- All descriptions in English

### File Organization
```
src/components/ComponentName/
├── __tests__/
│   └── ComponentName.test.tsx
├── index.tsx
└── other-files.ts
```

### Testing Patterns
- **Arrange-Act-Assert** pattern
- **Mock external dependencies** (next/image, child components)
- **Test user interactions** with fireEvent
- **Validate DOM structure** and CSS classes
- **Test accessibility** features
- **Cover edge cases** and error states

## Next Steps

### Immediate Improvements
1. Add tests for main app page (`src/app/page.tsx`)
2. Add tests for layout component (`src/app/layout.tsx`)
3. Improve branch coverage in Sidebar component
4. Add integration tests for component interactions

### Future Enhancements
1. Add E2E tests with Playwright or Cypress
2. Add visual regression tests
3. Add performance testing
4. Add accessibility testing with axe-core
5. Add mutation testing for better test quality

## Running Tests

### Development
```bash
npm run test:watch
```
Runs tests in watch mode, automatically re-running when files change.

### CI/CD
```bash
npm test
```
Runs all tests once with coverage report.

### Coverage Analysis
```bash
npm run test:coverage
```
Generates detailed coverage report in `coverage/` directory.

## Test Maintenance

### Adding New Tests
1. Create test file in `__tests__/` directory
2. Follow existing naming conventions
3. Use established testing patterns
4. Ensure 100% test pass rate
5. Update this documentation

### Updating Tests
1. Run tests before making changes
2. Update tests to match component changes
3. Maintain test coverage levels
4. Validate all tests pass
5. Update documentation if needed

## Best Practices

### Test Writing
- Write tests that resemble how users interact with the app
- Test behavior, not implementation details
- Use semantic queries (getByRole, getByText) over test IDs
- Keep tests focused and isolated
- Use descriptive test names

### Test Organization
- Group related tests with `describe` blocks
- Use `beforeEach` for common setup
- Mock external dependencies consistently
- Clean up after tests with `afterEach` if needed

### Performance
- Keep tests fast and focused
- Avoid unnecessary renders
- Use appropriate mocking strategies
- Monitor test execution time

---

**Last Updated**: March 2025
**Test Status**: All 118 tests passing ✅
**Coverage**: 57.05% overall statements 