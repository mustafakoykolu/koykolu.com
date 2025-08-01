﻿# koykolu.com
# koykolu.com - Kişisel Portfolyo Sitesi

![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![.NET](https://img.shields.io/badge/.NET-9-blueviolet?style=for-the-badge&logo=dotnet)
![Docker](https://img.shields.io/badge/Docker-gray?style=for-the-badge&logo=docker)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-darkblue?style=for-the-badge&logo=postgresql)

Bu repo, kişisel portfolyo sitem olan **[koykolu.com](https://koykolu.com)**'un kaynak kodlarını içerir. Proje, modern teknolojilerle geliştirilmiş 3 katmanlı (UI, API, Veritabanı) bir mimariye sahiptir ve bir Raspberry Pi 5 üzerinde **Docker** ile self-host edilmektedir.

🔗 **Canlı Demo:** [https://koykolu.com](https://koykolu.com)

## ✨ Özellikler

-   Modern ve reaktif arayüz
-   Backend API üzerinden yönetilen dinamik içerik
-   Kolayca genişletilebilir modüler yapı
-   Docker ile tek komutla kurulum ve çalıştırma

## 🛠️ Teknoloji Mimarisi

Proje, birbirinden bağımsız çalışabilen servislerden oluşur ve `docker-compose` ile yönetilir.

-   **Frontend (UI):** `React 19` (Vite ile)
-   **Backend (API):** `.NET 9`
-   **Veritabanı:** `PostgreSQL 16`
-   **Altyapı & DevOps:** `Docker`, `Docker Compose`, `Raspberry Pi 5`, `Cloudflare Tunnel`

### 🏗️ Sistem Mimarisi Şeması

Aşağıdaki şema, kullanıcıdan veritabanına kadar olan tüm akışı göstermektedir.

```mermaid
graph TD;
    subgraph İnternet
        User[👤 Kullanıcı];
    end

    subgraph "Raspberry Pi 5 Sunucusu"
        subgraph "Docker Ortamı"
            UI(react_ui:80);
            API(dotnet_api:8080);
            DB[(postgres_db:5432)];
        end
        Cloudflare[Cloudflare Tunnel];
    end

    User --> Cloudflare;
    Cloudflare --> UI;
    UI -- "API İstekleri" --> API;
    API -- "Veritabanı İşlemleri" --> DB;

```

## 🏁 Projeyi Yerel Ortamda Çalıştırma

Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları takip edebilirsiniz.

### Gereksinimler

-   [Git](https://git-scm.com/)
-   [Docker](https://www.docker.com/products/docker-desktop/)
-   [Docker Compose](https://docs.docker.com/compose/) (Docker Desktop ile birlikte gelir)

### Kurulum Adımları

1.  **Repoyu klonlayın:**
    ```bash
    git clone [https://github.com/KULLANICI_ADIN/REPO_ADIN.git](https://github.com/KULLANICI_ADIN/REPO_ADIN.git)
    cd REPO_ADIN
    ```

2.  **Ortam Değişkenlerini Ayarlayın:**
    Projenin ana dizininde `.env` adında bir dosya oluşturun. Bu dosya, `docker-compose.yml` tarafından okunacak olan veritabanı bilgileri gibi hassas verileri içerecektir.

    Aşağıdaki `.env.example` içeriğini kopyalayıp kendi `.env` dosyanıza yapıştırın ve değerleri kendinize göre düzenleyin.

3.  **Projeyi Başlatın:**
    Aşağıdaki komut ile tüm servisleri Docker üzerinde ayağa kaldırın.
    ```bash
    docker-compose up -d --build
    ```
    -   `-d` (detached mode) servislerin arka planda çalışmasını sağlar.
    -   `--build` ilk çalıştırmada imajların oluşturulmasını sağlar.

4.  **Uygulamaya Erişin:**
    -   **UI (Arayüz):** `http://localhost:80`
    -   **API (Swagger):** `http://localhost:8080/swagger`
    -   **PostgreSQL Veritabanı:** `localhost:5432` üzerinden bir veritabanı aracıyla erişilebilir.

## ⚙️ Yapılandırma (`.env` Dosyası)

Projenin çalışması için gerekli olan ortam değişkenleri aşağıda listelenmiştir. Projenin ana dizininde `.env` adıyla bu dosyayı oluşturduğunuzdan emin olun.

```dotenv
# .env.example

# PostgreSQL Veritabanı Ayarları
POSTGRES_DB=benim_db
POSTGRES_USER=benim_kullanici
POSTGRES_PASSWORD=cokguclubirsifre

# React UI için API adresi
# Docker içindeki API servisine 'http://dotnet_api:8080' adresiyle erişir
VITE_API_URL_COMPOSE=http://localhost:8080/api

```

## 📝 Lisans

Bu proje [MIT Lisansı](LICENSE) ile lisanslanmıştır.

---
_Bu README dosyası, projenin yapısını ve teknolojilerini yansıtacak şekilde hazırlanmıştır._
