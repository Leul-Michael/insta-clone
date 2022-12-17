export default function useLogin() {
  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(import.meta.env.VITE_GRAPHQL_URI, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
               mutation login($email: String!, $password: String!) {
                    login(email: $email, password: $password) {
                        token
                        id
                    }
                }
               
               `,
          variables: {
            email,
            password,
          },
        }),
      })
      const { data, errors } = await res.json()

      if (errors) {
        throw new Error(errors[0].message)
      }
      return data?.login
    } catch (e: any) {
      throw new Error(e.message)
    }
  }
  return login
}
