export function buildRoutePath(path) {
	// Encontrar os ':foo' no path passado como parâmetro
	const routeParametersRegex = /:([(a-zA-Z)]+)/g

	// Usando esse regex, substituir o :id no path por outro regex que aceita id no formato fornecido por randomUUID()
  const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')

	const pathRegex = new RegExp(`^${pathWithParams}`)

	return pathRegex
}
