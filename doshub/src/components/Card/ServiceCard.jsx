/**
 * ServiceCard component to display barangay services
 * @param {Object} props
 * @param {Object} props.service - Service information
 * @param {string} props.service.id - Unique identifier
 * @param {string} props.service.title - Service name
 * @param {string} props.service.excerpt - Short description
 * @param {string[]} props.service.requirements - List of requirements
 */
function ServiceCard({ service }) {
  const { id, title, excerpt, requirements = [] } = service

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Service Icon Placeholder */}
      <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
        <svg
          className="w-6 h-6 text-primary-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      {/* Service Details */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{excerpt}</p>

      {/* Requirements List */}
      {requirements.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Requirements:</h4>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            {requirements.map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Request Button */}
      <button
        type="button"
        onClick={() => window.location.href = `/services/${id}/request`}
        className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
      >
        Request Service
        <span className="sr-only"> - {title}</span>
      </button>
    </div>
  )
}

export default ServiceCard
