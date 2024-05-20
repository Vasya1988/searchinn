/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    generateBuildId: async () => {
        return 'build-' + Date.now()
    }
}

module.exports = nextConfig

// const nextConfig = {
//     output: 'export',
//     generateBuildId: async () => {
//         return 'build-' + Date.now()
//     }
// }