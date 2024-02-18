var ghpages = require('gh-pages');

ghpages.publish(
    'public',
    {
        branch: 'gh-pages',
        silent: true,
        repo: 'https://' + process.env.GITHUB_TOKEN + '@github.com/DenmarFel/blog-front-end.git',
        user: {
            name: 'Denmar Feliciano',
            email: 'denmarfeliciano@gmail.com'
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)