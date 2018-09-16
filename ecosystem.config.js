module.exports = {
    apps: [{
      name: 'Noor',
      script: './index.js'
    }],
    deploy: {
      production: {
        user: 'ubuntu',
        host: 'ec2-13-57-251-36.us-west-1.compute.amazonaws.com',
        key: '~/.ssh/noot.pem',
        ref: 'origin/master',
        repo: 'git@github.com:a01334390/noor.git',
        path: '/home/ubuntu/noor',
        'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
      }
    }
  }