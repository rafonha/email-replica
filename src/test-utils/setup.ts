export * from "@testing-library/react";

export const setupTestEnvironment = () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
};

export const mockDate = (date: string) => {
  const mockDate = new Date(date);
  jest.spyOn(global, "Date").mockImplementation(() => mockDate as unknown as Date);
  return mockDate;
};

export const restoreDate = () => {
  jest.restoreAllMocks();
}; 