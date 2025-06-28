# Testing Guide for Angular Movie Search App

This guide covers both **Unit Testing** and **End-to-End (E2E) Testing** for the Angular Movie Search application.

## Table of Contents

1. [Unit Testing with Jasmine & Karma](#unit-testing)
2. [End-to-End Testing with Cypress](#e2e-testing)
3. [Testing Commands](#testing-commands)
4. [Test Structure & Best Practices](#best-practices)
5. [Continuous Integration](#ci)

## Unit Testing

### Overview

Unit tests are written using **Jasmine** testing framework and run with **Karma** test runner. They test individual components, services, and functions in isolation.

### Test Files Location

- All unit test files end with `.spec.ts`
- Located alongside the source files they test
- Examples:
  - `src/app/components/search-bar/search-bar.spec.ts`
  - `src/app/services/api.service.spec.ts`
  - `src/app/pages/Home/home.spec.ts`

### Key Testing Concepts

#### 1. Component Testing

```typescript
describe("SearchBar", () => {
  let component: SearchBar;
  let fixture: ComponentFixture<SearchBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBar, ReactiveFormsModule, BrowserAnimationsModule],
      providers: [{ provide: MatSnackBar, useValue: snackBarSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should emit search query on valid submission", () => {
    spyOn(component.searchQuery, "emit");

    component.formData.patchValue({ searchQuery: "Inception" });
    component.onSubmit();

    expect(component.searchQuery.emit).toHaveBeenCalledWith("Inception");
  });
});
```

#### 2. Service Testing

```typescript
describe("ApiService", () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it("should make GET request to correct URL", () => {
    service.get<Movie>("/search?q=test").subscribe();

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/search?q=test`);
    expect(req.request.method).toBe("GET");

    req.flush(mockApiResponse);
  });
});
```

#### 3. Mocking Dependencies

```typescript
// Mocking services
const apiSpy = jasmine.createSpyObj("ApiService", ["get"]);
const errorSpy = jasmine.createSpyObj("ErrorHandlerService", ["handleError"]);

// Mocking HTTP responses
apiService.get.and.returnValue(of(mockApiResponse));
apiService.get.and.returnValue(throwError(() => new Error("API Error")));
```

### What We Test

#### Components:

- ✅ Component creation
- ✅ Form validation
- ✅ Event emission
- ✅ User interactions
- ✅ DOM rendering
- ✅ Input/Output properties

#### Services:

- ✅ HTTP requests
- ✅ Error handling
- ✅ Data transformation
- ✅ Service methods
- ✅ Dependency injection

#### Current Test Coverage:

- **App Component**: Basic rendering and routing
- **SearchBar Component**: Form validation, event emission, snackbar errors
- **MovieCard Component**: Navigation, image loading states, user interactions
- **Home Component**: Search functionality, API integration, loading states
- **ApiService**: HTTP requests, error handling, response transformation
- **ErrorHandlerService**: Error types, snackbar notifications

## E2E Testing

### Overview

End-to-End tests use **Cypress** to test the complete user journey through the application in a real browser environment.

### Test Files Location

- E2E tests are located in `cypress/e2e/`
- Test files end with `.cy.ts`
- Example: `cypress/e2e/movie-search.cy.ts`

### Key E2E Testing Concepts

#### 1. User Journey Testing

```typescript
describe("Search Functionality", () => {
  it("should allow user to search for movies", () => {
    cy.visit("/");

    // Type in search box
    cy.get("input[matInput]").type("Inception");

    // Submit search
    cy.get('button[type="submit"]').click();

    // Check loading state
    cy.get(".loading").should("be.visible");
    cy.get("mat-spinner").should("be.visible");

    // Wait for results
    cy.get(".loading", { timeout: 10000 }).should("not.exist");
  });
});
```

#### 2. API Mocking

```typescript
beforeEach(() => {
  // Mock API response for consistent testing
  cy.intercept("GET", "**/search?q=*", {
    fixture: "movies.json",
  }).as("searchMovies");
});

it("should display movie cards when search returns results", () => {
  cy.get("input[matInput]").type("Test Movie");
  cy.get('button[type="submit"]').click();

  cy.wait("@searchMovies");

  cy.get("app-movie-card").should("have.length.greaterThan", 0);
});
```

#### 3. Custom Commands

```typescript
// cypress/support/commands.ts
Cypress.Commands.add("searchMovies", (query: string) => {
  cy.get('[data-cy="search-input"]').clear().type(query);
  cy.get('[data-cy="search-button"]').click();
});

// Usage in tests
cy.searchMovies("Inception");
```

### What We Test

#### User Flows:

- ✅ Application layout and navigation
- ✅ Search functionality
- ✅ Form validation
- ✅ Movie results display
- ✅ Movie details navigation
- ✅ Responsive design
- ✅ Error handling

#### Cross-browser Testing:

- ✅ Chrome (headless and headed)
- ✅ Firefox
- ✅ Edge

#### Responsive Testing:

- ✅ Mobile viewports (iPhone X)
- ✅ Tablet viewports (iPad)
- ✅ Desktop viewports

## Testing Commands

### Unit Tests

```bash
# Run tests once
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests in headless Chrome (CI)
ng test --watch=false --browsers=ChromeHeadless
```

### E2E Tests

```bash
# Run E2E tests in headless mode
npm run e2e

# Open Cypress Test Runner (interactive)
npm run e2e:open

# Run E2E tests for CI
npm run e2e:ci

# Run specific test file
npx cypress run --spec "cypress/e2e/movie-search.cy.ts"
```

### Development Workflow

```bash
# Start development server
npm start

# In another terminal, run tests in watch mode
npm run test:watch

# For E2E testing, start dev server then run:
npm run e2e:open
```

## Best Practices

### Unit Testing Best Practices

1. **Test Structure (AAA Pattern)**

   ```typescript
   it("should do something", () => {
     // Arrange
     const input = "test data";

     // Act
     const result = component.someMethod(input);

     // Assert
     expect(result).toBe("expected output");
   });
   ```

2. **Descriptive Test Names**

   ```typescript
   // ❌ Bad
   it("should work", () => {});

   // ✅ Good
   it("should emit search query when form is valid and submitted", () => {});
   ```

3. **Test One Thing at a Time**

   ```typescript
   // ❌ Bad - testing multiple things
   it("should handle form submission", () => {
     // tests validation AND emission AND API call
   });

   // ✅ Good - separate tests
   it("should validate form before submission", () => {});
   it("should emit search query on valid submission", () => {});
   it("should call API service with correct parameters", () => {});
   ```

4. **Use Proper Mocking**

   ```typescript
   // Mock external dependencies
   const mockApiService = jasmine.createSpyObj("ApiService", ["get"]);
   mockApiService.get.and.returnValue(of(mockData));
   ```

5. **Test Edge Cases**
   ```typescript
   it("should handle empty search query", () => {});
   it("should handle API errors", () => {});
   it("should handle network failures", () => {});
   ```

### E2E Testing Best Practices

1. **Use Data Attributes for Selectors**

   ```html
   <!-- In template -->
   <button data-cy="search-button" type="submit">Search</button>
   ```

   ```typescript
   // In test
   cy.get('[data-cy="search-button"]').click();
   ```

2. **Mock External APIs**

   ```typescript
   cy.intercept("GET", "**/api/**", { fixture: "api-response.json" });
   ```

3. **Test User Journeys, Not Implementation**

   ```typescript
   // ❌ Bad - testing implementation
   it("should call searchMovies method", () => {});

   // ✅ Good - testing user behavior
   it("should display search results when user searches for movies", () => {});
   ```

4. **Keep Tests Independent**

   ```typescript
   beforeEach(() => {
     cy.visit("/");
     // Reset state before each test
   });
   ```

5. **Use Page Object Pattern for Complex Pages**
   ```typescript
   class SearchPage {
     visit() {
       cy.visit("/");
     }

     searchFor(query: string) {
       cy.get('[data-cy="search-input"]').type(query);
       cy.get('[data-cy="search-button"]').click();
     }
   }
   ```

## Continuous Integration

### GitHub Actions Example

```yaml
name: Tests

on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm ci
      - run: npm run test:coverage

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm ci
      - run: npm start &
      - run: npm run e2e:ci
```

### Test Coverage Goals

- **Unit Tests**: Aim for 80%+ code coverage
- **E2E Tests**: Cover all critical user journeys
- **Integration Tests**: Test component interactions

## Common Testing Patterns

### Testing Angular Material Components

```typescript
// Import BrowserAnimationsModule for Material components
beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [ComponentUnderTest, BrowserAnimationsModule],
  }).compileComponents();
});
```

### Testing Forms

```typescript
it("should validate required fields", () => {
  const control = component.formData.get("searchQuery");

  expect(control?.valid).toBeFalse();
  expect(control?.hasError("required")).toBeTrue();

  control?.setValue("test");
  expect(control?.valid).toBeTrue();
});
```

### Testing HTTP Requests

```typescript
it("should handle HTTP errors", () => {
  const errorResponse = { status: 404, statusText: "Not Found" };

  service.get("/api/movies").subscribe({
    next: () => fail("Expected an error"),
    error: (error) => {
      expect(errorHandlerSpy.handleError).toHaveBeenCalled();
    },
  });

  const req = httpMock.expectOne("/api/movies");
  req.flush("Not Found", errorResponse);
});
```

## Debugging Tests

### Unit Test Debugging

```typescript
// Add console.log for debugging
it("should do something", () => {
  console.log("Component state:", component);
  console.log("Form value:", component.formData.value);

  // Your test code
});

// Use debugger
it("should do something", () => {
  debugger; // Will pause execution in browser dev tools
  // Your test code
});
```

### E2E Test Debugging

```typescript
// Add screenshots
cy.screenshot("before-action");
cy.get("button").click();
cy.screenshot("after-action");

// Pause test execution
cy.pause(); // Opens Cypress runner and pauses

// Debug commands
cy.debug(); // Logs current subject to console
```

## Conclusion

This testing setup provides comprehensive coverage of your Angular Movie Search application:

- **Unit Tests**: Fast, isolated testing of components and services
- **E2E Tests**: Full user journey testing in real browsers
- **Continuous Integration**: Automated testing on every code change

The combination ensures your application is reliable, maintainable, and provides a great user experience.

### Next Steps

1. Run the existing tests: `npm run test`
2. Explore E2E testing: `npm run e2e:open`
3. Add tests for new features as you develop them
4. Set up CI/CD pipeline with automated testing
5. Monitor test coverage and aim for comprehensive coverage

Happy testing! 🧪
