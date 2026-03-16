module.exports = {
  apps: [
    {
      name: "anixlab-core-server",
      cwd: "./apps/core-server",
      script: "dist/index.js",
      node_args: "--env-file=.env",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "300M",
      time: true,
      env: { NODE_ENV: "production" },
    },
  ],
};
