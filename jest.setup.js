import '@testing-library/jest-dom'

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className, ...props }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img 
      src={typeof src === 'string' ? src : src?.src || ''} 
      alt={alt} 
      width={width} 
      height={height} 
      className={className}
      {...props} 
    />
  },
})) 