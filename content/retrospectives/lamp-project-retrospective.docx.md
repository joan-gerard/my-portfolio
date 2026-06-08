# **LAMP Stack Project — Retrospective**

*NovaMart eCommerce · LAMP Stack · Lima VM \+ Docker Compose*

# **1\. Technical Evaluation**

## **Goal Achievement**

The project fully achieved its goals. I set out to deploy a LAMP stack application on a local server environment and automate the process with a shell script. Both were completed successfully. The app runs end to end — Apache serves the PHP frontend, MariaDB stores and returns product data, and the setup.sh script reproduces the entire environment on a clean Ubuntu machine with a single command.

The Docker Compose layer also works as intended. Running docker compose up from the repo root spins up both the web and database containers, seeds the database automatically, and serves the app at http://localhost:8080 with no manual steps.

## **Bottlenecks**

* **Read-only file system in Lima.** 

Lima mounts the Mac home directory as read-only by default. I could not clone the repo or create files in the usual working directory. Resolved by working in /tmp instead.

* **Port conflict on Mac.** 

Port 80 was already in use when running Docker Compose. Resolved by remapping to port 8080 in docker-compose.yml.

* **mysql\_secure\_installation not available.** 

The command was missing on Ubuntu 25.10. Resolved by configuring MariaDB manually through the mariadb shell directly.

* **Default Apache welcome page served instead of index.php.** 

Apache prioritises index.html by default. Resolved by editing dir.conf to move index.php to the front of the DirectoryIndex list.

## **Trade-offs**

* **The course specifies CentOS but I chose Ubuntu. Ubuntu is more representative of modern cloud environments and has better long-term package support. The LAMP setup is identical — only the package manager and service names differ.**Ubuntu over CentOS. 

* **Two different approaches to passing database credentials. The VM approach uses Apache's envvars file, which is straightforward for a single-machine deployment. The Docker approach generates a .env file at container startup from environment variables defined in docker-compose.yml, which is cleaner for a containerised setup.**Environment variables via Apache envvars (VM) vs .env file (Docker). 

* **I chose to write my own PHP application rather than relying entirely on the KodeKloud repo. This means the project is entirely my own work, at the cost of more upfront effort.**KodeKloud app replaced with custom PHP app. 

## **Limitations**

* **Running it twice on the same machine could cause issues — for example, the git clone step will fail if the directory already exists. A guard was added for that specific case but the rest of the script is not fully idempotent.**setup.sh is not idempotent. 

* **The deployment runs over plain HTTP. A production environment would require SSL/TLS via Let's Encrypt or similar.**No HTTPS. 

* **Database passwords are stored in docker-compose.yml and setup.sh. A production setup would use a secrets manager or at minimum a .env file excluded from version control.**Credentials hardcoded in config files. 

* **The current setup runs everything on one machine. The project covers multi-node architecture conceptually but does not implement it.**Single-node only. 

# **2\. Code & Architecture Review**

## **Refactoring**

* **The script is a single flat file. Breaking it into functions (install\_packages, configure\_database, deploy\_app, configure\_apache) would make it easier to read, test, and reuse individual steps.**setup.sh could be modularised. 

* **Appending exports to /etc/apache2/envvars works but is not clean. A dedicated Apache config file for environment variables would be more maintainable.**Apache envvars approach is brittle. 

## **Anti-patterns**

* **Granting all privileges to the ecomuser is overly permissive. In a real environment, the database user should only have the minimum permissions needed — SELECT, INSERT, UPDATE, DELETE on the specific database.**GRANT ALL PRIVILEGES. 

* **Passwords appear in docker-compose.yml and setup.sh. Acceptable for a learning project but would be a serious issue in production.**Plaintext passwords in config. 

## **Scalability**

The current single-node setup would not scale well under real load. Bottlenecks would appear at the database layer first, followed by the web server. To handle 10x more data or users, the architecture would need to evolve:

* Horizontal scaling of the web layer behind a load balancer.

* Database read replicas to distribute query load.

* A caching layer (Redis or Memcached) to reduce database hits for product listings.

* Migration from Docker Compose to Kubernetes for container orchestration at scale.

# **3\. Knowledge Integration**

## **Key Takeaways**

The biggest lesson is how much context a working environment provides. Reading documentation about LAMP stack deployment is abstract. Watching Apache fail to serve index.php because of a DirectoryIndex misconfiguration, debugging it, and fixing it makes the concept concrete in a way that sticks. The bottlenecks were the most valuable part of the project.

## **Reusability**

* **The script structure — update packages, install services, configure, deploy — is a reusable pattern for any LAMP-style deployment. Future projects can adapt it.**setup.sh as a provisioning template. 

* **The two-service pattern (web container \+ database container with volume-mounted init SQL) is directly reusable for any PHP \+ MariaDB project.**docker-compose.yml as a web \+ db template. 

* **The loadEnv() function in index.php is a clean, dependency-free way to handle environment configuration in PHP. Worth reusing in future PHP projects.**The .env pattern in PHP. 

* **Useful reference for passing runtime configuration to PHP applications served by Apache without modifying application code.**Apache envvars pattern. 

## **Next Steps**

* **Apache works well but Nginx is more commonly used in modern deployments. Understanding the differences — especially around configuration syntax and performance characteristics — is a natural next step.**Learn Nginx. 

* **Setting up SSL/TLS would make the VM deployment production-realistic and is a common interview topic.**Add HTTPS with Let's Encrypt. 

* **setup.sh works but Ansible would make infrastructure provisioning more robust, idempotent, and readable. A natural evolution from shell scripting.**Explore Ansible. 

* **The Docker Compose setup is a stepping stone. Understanding how to translate it into Kubernetes manifests (Deployments, Services, ConfigMaps, Secrets) is the logical next step in the DevOps learning path.**Kubernetes. 

# **4\. Project Artifacts — The "Future You" Checklist**

## **README**

* Setup steps documented for both deployment approaches (VM and Docker Compose). ✓

* Tech stack listed with versions. ✓

* Project goals implicit — could be made more explicit with a brief intro paragraph.

## **Documentation**

* setup.sh is self-documenting via echo statements but lacks inline comments explaining why certain steps are done (e.g. why dir.conf needs to be edited).

* docker-compose.yml has no comments. Adding brief comments explaining the volume mount and environment variable strategy would help future readers.

* The .env generation step in the Dockerfile CMD is opaque — worth adding a comment in the Dockerfile explaining the approach.

## **Post-mortem: Lessons Learned**

Add a Lessons Learned section to the GitHub README covering:

* Lima mounts Mac home as read-only — always work in /tmp inside a Lima VM.

* Apache serves index.html by default — always check DirectoryIndex when deploying PHP apps.

* Docker port conflicts are common on Mac — use ports above 8000 for local development to avoid collisions.

* Ubuntu 25.10 does not include mysql\_secure\_installation — configure MariaDB manually via the shell.

* Testing the script on a clean VM before declaring it done is non-negotiable.

*Written after completing the NovaMart LAMP stack deployment project.*

# **5\. Interview Q\&A**

*Questions a recruiter or hiring manager might ask about this project, with honest answers reflecting a full stack engineer transitioning into DevOps.*

## **Project Overview**

| Q: Can you walk me through this project? |
| :---- |
| I deployed a LAMP stack application on a local Ubuntu VM using Lima to simulate a real server environment. The stack consists of Apache as the web server, MariaDB as the database, and PHP for the application layer. I wrote a shell script that automates the full provisioning process — package installation, service configuration, database setup, and application deployment — so it can reproduce the environment on any fresh Ubuntu machine with a single command. I also built a Docker Compose setup as a local development environment, using two containers: one for the web server and one for the database. That's what I'd use for a quick demo — it's up and running with docker compose up. |

| Q: Why did you choose Ubuntu instead of CentOS? |
| :---- |
| The project originally specified CentOS, but I made a deliberate decision to use Ubuntu. Ubuntu is more representative of modern cloud server environments — AWS, GCP, and Azure all default to it for their managed instances. The LAMP stack setup is nearly identical across both distributions. The main differences are the package manager (apt vs yum) and the Apache service name (apache2 vs httpd). The underlying concepts are the same, and the skills transfer directly. |

| Q: Why did you use a VM and Docker Compose? Aren't they redundant? |
| :---- |
| They serve different purposes. The VM simulates a real server environment — it's how I'd deploy to a production-like Ubuntu machine. The shell script I wrote is the artifact from that work. Docker Compose is for local development. It lets anyone clone the repo and spin up the full stack with one command, without needing to provision a server. They complement each other rather than overlap. |

## **Technical Questions**

| Q: What does your setup.sh script actually do? |
| :---- |
| It automates the full LAMP stack deployment in sequence. It updates the package list, installs Apache, MariaDB, and PHP, starts and enables the services, creates the database and user, loads the inventory data from a SQL file, clones the application code, sets the database credentials as environment variables in Apache's envvars file, updates the Apache directory config to serve index.php first, and restarts Apache. Each step is logged with an echo statement so you can follow along as it runs. The whole thing takes about two minutes on a fresh machine. |

| Q: How does the application get its database credentials? |
| :---- |
| It depends on the deployment approach. In the VM setup, the credentials are set as environment variables in Apache's /etc/apache2/envvars file. Apache passes them to PHP at runtime, and the application reads them with getenv(). In the Docker Compose setup, the credentials are defined in docker-compose.yml as environment variables. The Dockerfile's CMD generates a .env file from those variables at container startup, and the PHP application reads from that file using a custom loadEnv() function. |

| Q: How does Docker Compose handle the database setup? |
| :---- |
| The MariaDB container handles it automatically. The official MariaDB Docker image looks for SQL files in /docker-entrypoint-initdb.d/ and runs them on first startup. I mount the db-load-script.sql file into that directory as a volume, so the database is created, the table is set up, and the seed data is loaded without any manual steps. |

| Q: How would you handle database credentials in a production environment? |
| :---- |
| In the current setup, credentials are stored in docker-compose.yml and setup.sh, which is fine for a learning project but not acceptable in production. In a real environment I'd use a secrets manager — AWS Secrets Manager or HashiCorp Vault for example — and inject credentials at runtime rather than storing them in config files. At minimum, I'd use a .env file excluded from version control and document that it needs to be created separately. |

## **Architecture & Scalability**

| Q: How would this architecture handle 10x more traffic? |
| :---- |
| It wouldn't scale well as-is. Everything runs on a single node, so the first bottleneck would be the database under read load, followed by the web server. To scale it properly I'd separate the concerns — a load balancer in front of multiple web server instances, database read replicas for query distribution, and a caching layer like Redis to reduce database hits for product listings. Beyond that, migrating from Docker Compose to Kubernetes would handle container orchestration at scale. |

| Q: What are the limitations of this setup? |
| :---- |
| A few honest ones: the setup script is not fully idempotent — running it twice on the same machine could cause issues in places. There's no HTTPS, so it runs over plain HTTP. Database credentials are stored in config files rather than a secrets manager. And it's single-node only, so there's no redundancy or failover. |

## **DevOps Learning Path**

| Q: This is a fairly basic project. What are you working on next? |
| :---- |
| This project is part of a structured DevOps learning path I'm working through. The immediate next steps are adding HTTPS with Let's Encrypt to make the VM deployment production-realistic, and exploring Ansible as a more robust alternative to shell scripting for infrastructure provisioning. After that, Kubernetes is the logical next step — translating the Docker Compose setup into Kubernetes manifests would cover Deployments, Services, ConfigMaps, and Secrets, which maps directly to how container workloads run in production. |

| Q: You're a full stack engineer. Why are you moving into DevOps? |
| :---- |
| I've spent several years building applications and I kept running into the same friction point — I could build something well but the deployment, infrastructure, and operational side was often a black box. I want to close that gap. DevOps isn't a departure from full stack engineering for me, it's an extension of it. Understanding how to provision infrastructure, automate deployments, and containerise applications makes me a stronger engineer overall, not just in a specific role. |

*These answers reflect honest experience — not inflated claims. The goal is to speak confidently about what was built and why, while being clear about where the learning is still ongoing.*