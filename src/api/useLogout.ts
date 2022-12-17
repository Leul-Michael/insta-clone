export default function useLogout() {
  const logout = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_GRAPHQL_URI, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
                query logout {
                    logout {
                      token
                    }
                }   
                 `,
        }),
      })
      const { data, errors } = await res.json()

      if (errors) {
        throw new Error(errors[0].message)
      }
      return data?.logout
    } catch (e: any) {
      throw new Error(e.message)
    }
  }
  return logout
}
