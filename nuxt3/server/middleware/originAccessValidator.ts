export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    if (config.isDev) {
        return
    }
    if (event.req.headers.referer !== config.referer) {
        throw createError({
            statusCode: 403,
            message: "Forbidden",
        })
    }
})