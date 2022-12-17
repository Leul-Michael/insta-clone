export default function useRefreshToken() {
  const refresh = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_GRAPHQL_URI, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
                query refreshToken {
                    refresh {
                        token
                        id
                    }
                }
                   
                `,
        }),
      })

      if (!res) {
        throw new Error()
      }
      const { data, errors } = await res.json()

      if (errors) {
        throw new Error(errors[0].message)
      }

      return data?.refresh
    } catch (e: any) {
      throw new Error(e.message)
    }
  }
  return refresh
}
