/**
 * Container component for consistent page layout
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to be wrapped
 * @param {string} [props.className] - Additional CSS classes
 */
function Container({ children, className = '' }) {
  return (
    <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}

export default Container
