# MS Technologies - Hostinger VPS Deployment Guide

This guide provides step-by-step instructions to deploy your MS Technologies website to Hostinger VPS with professional configuration.

## Prerequisites

1. **Hostinger VPS Plan** - KVM 2 or higher recommended
2. **Domain Name** - Pointed to Hostinger nameservers
3. **SSH Access** - Terminal/PuTTY for VPS connection
4. **GitHub Account** - For code deployment

---

## Part 1: VPS Initial Setup

### Step 1: Access Your VPS

```bash
# Connect via SSH (replace with your VPS IP)
ssh root@YOUR_VPS_IP

# Or use the Hostinger hPanel SSH terminal
```

### Step 2: Update System

```bash
# Update package lists
apt update && apt upgrade -y

# Install essential packages
apt install -y curl wget git nginx certbot python3-certbot-nginx ufw
```

### Step 3: Install Node.js (v20 LTS)

```bash
# Install Node.js using NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version
```

### Step 4: Install PM2 (Process Manager)

```bash
npm install -g pm2
```

### Step 5: Configure Firewall

```bash
# Enable UFW
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable

# Verify status
ufw status
```

---

## Part 2: Deploy Application

### Step 1: Create Application Directory

```bash
# Create web directory
mkdir -p /var/www/mstechnologies
cd /var/www/mstechnologies
```

### Step 2: Clone Your Repository

```bash
# Clone from GitHub (replace with your repo URL)
git clone https://github.com/YOUR_USERNAME/ms-technologies.git .

# Or download from Lovable's GitHub integration
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Create Environment File

```bash
nano .env
```

Add your environment variables:

```env
VITE_SUPABASE_URL=https://avuzybshtadsnjvhmprv.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2dXp5YnNodGFkc25qdmhtcHJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2MDkzNjksImV4cCI6MjA4MDE4NTM2OX0.7wg_r4I1jKQpZqqGIUJUloZ47OmPzpSDHvGTT8kaB2A
VITE_SUPABASE_PROJECT_ID=avuzybshtadsnjvhmprv
```

Save with `Ctrl+X`, then `Y`, then `Enter`.

### Step 5: Build Production Files

```bash
npm run build
```

This creates the `dist/` folder with optimized production files.

---

## Part 3: Configure Nginx

### Step 1: Create Nginx Configuration

```bash
nano /etc/nginx/sites-available/mstechnologies
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name mstechnologies.company www.mstechnologies.company;
    root /var/www/mstechnologies/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml application/javascript;
    gzip_disable "MSIE [1-6]\.";

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Serve static files directly
    location /sitemap.xml {
        try_files $uri =404;
    }

    location /robots.txt {
        try_files $uri =404;
    }

    # SPA routing - serve index.html for all routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Deny access to hidden files
    location ~ /\. {
        deny all;
    }
}
```

### Step 2: Enable Site

```bash
# Create symbolic link
ln -s /etc/nginx/sites-available/mstechnologies /etc/nginx/sites-enabled/

# Remove default site
rm /etc/nginx/sites-enabled/default

# Test configuration
nginx -t

# Restart Nginx
systemctl restart nginx
```

---

## Part 4: SSL Certificate (HTTPS)

### Step 1: Point Domain to VPS

In your domain registrar (or Hostinger):
1. Go to DNS settings
2. Add/Update A record:
   - Name: `@`
   - Value: `YOUR_VPS_IP`
3. Add A record for www:
   - Name: `www`
   - Value: `YOUR_VPS_IP`

Wait 5-10 minutes for DNS propagation.

### Step 2: Install SSL Certificate

```bash
# Run Certbot
certbot --nginx -d mstechnologies.company -d www.mstechnologies.company

# Follow prompts:
# - Enter email for notifications
# - Agree to terms
# - Choose redirect HTTP to HTTPS (recommended)
```

### Step 3: Auto-Renewal

```bash
# Test auto-renewal
certbot renew --dry-run

# Certbot automatically creates a cron job for renewal
```

---

## Part 5: Process Management with PM2 (Optional)

For serving static files, Nginx is sufficient. But if you want to add a Node.js backend later:

```bash
# Create a simple Express server (optional)
nano /var/www/mstechnologies/server.js
```

```javascript
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

```bash
# Install Express
npm install express

# Start with PM2
pm2 start server.js --name "mstechnologies"

# Save PM2 configuration
pm2 save

# Auto-start on reboot
pm2 startup
```

---

## Part 6: Continuous Deployment

### Option A: Manual Deployment

```bash
cd /var/www/mstechnologies

# Pull latest changes
git pull origin main

# Install dependencies (if package.json changed)
npm install

# Rebuild
npm run build

# Nginx will automatically serve new files
```

### Option B: GitHub Webhook (Automated)

1. Create deployment script:

```bash
nano /var/www/deploy.sh
```

```bash
#!/bin/bash
cd /var/www/mstechnologies
git pull origin main
npm install
npm run build
echo "Deployment completed at $(date)"
```

```bash
chmod +x /var/www/deploy.sh
```

2. Set up webhook listener (requires additional setup with services like webhook.site or custom Node.js server)

---

## Part 7: Monitoring & Maintenance

### View Nginx Logs

```bash
# Access logs
tail -f /var/log/nginx/access.log

# Error logs
tail -f /var/log/nginx/error.log
```

### System Monitoring

```bash
# Check disk space
df -h

# Check memory
free -m

# Check running processes
htop
```

### Backup Script

```bash
nano /root/backup.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d)
tar -czf /root/backups/mstechnologies-$DATE.tar.gz /var/www/mstechnologies
find /root/backups -mtime +30 -delete
```

```bash
chmod +x /root/backup.sh
mkdir -p /root/backups

# Add to crontab for weekly backup
crontab -e
# Add: 0 2 * * 0 /root/backup.sh
```

---

## Part 8: Performance Optimization

### Enable Nginx Caching

Add to your nginx config:

```nginx
# Browser caching
location ~* \.(jpg|jpeg|png|gif|ico|css|js|pdf|txt)$ {
    expires 7d;
    add_header Cache-Control "public, no-transform";
}
```

### Enable HTTP/2

Update SSL server block:

```nginx
listen 443 ssl http2;
```

---

## Troubleshooting

### Site Not Loading

```bash
# Check Nginx status
systemctl status nginx

# Check if port 80/443 is open
netstat -tlnp | grep nginx

# Check firewall
ufw status
```

### SSL Certificate Issues

```bash
# Renew certificate manually
certbot renew

# Check certificate status
certbot certificates
```

### Permission Issues

```bash
# Fix ownership
chown -R www-data:www-data /var/www/mstechnologies

# Fix permissions
chmod -R 755 /var/www/mstechnologies
```

---

## Security Best Practices

1. **Keep System Updated**: `apt update && apt upgrade -y`
2. **Disable Root SSH**: Edit `/etc/ssh/sshd_config`
3. **Use SSH Keys**: Generate with `ssh-keygen`
4. **Install Fail2Ban**: `apt install fail2ban`
5. **Regular Backups**: Use the backup script above

---

## Quick Reference Commands

```bash
# Restart Nginx
systemctl restart nginx

# View Nginx status
systemctl status nginx

# Test Nginx config
nginx -t

# Pull latest code
cd /var/www/mstechnologies && git pull && npm run build

# View SSL expiry
certbot certificates

# Check disk space
df -h
```

---

## Support

For issues with:
- **Hosting**: Contact Hostinger support
- **Application**: Check Lovable documentation
- **Database**: Lovable Cloud handles this automatically

Your backend (database, authentication, edge functions) is managed by Lovable Cloud and requires no VPS configuration.
