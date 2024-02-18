import { publish } from 'gh-pages';

publish('dist', {
    repo: 'https://github.com/DenmarFel/DenmarFel.github.io.git'
}, function(err){});