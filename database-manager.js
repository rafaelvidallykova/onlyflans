// 🗄️ DATABASE MANAGER - Handles all JSON database operations
class DatabaseManager {
  constructor() {
    this.dbKey = "onlyflans-database"
    this.metadataKey = "onlyflans-metadata"
    this.backupKey = "onlyflans-backups"
    this.operationCount = 0
    this.isInitialized = false

    // Initialize database
    this.initializeDatabase()
  }

  // 📥 Initialize database from JSON file or create new
  async initializeDatabase() {
    try {
      // Try to load existing database
      const existingDb = localStorage.getItem(this.dbKey)
      const existingMeta = localStorage.getItem(this.metadataKey)

      if (existingDb && existingMeta) {
        this.database = JSON.parse(existingDb)
        this.metadata = JSON.parse(existingMeta)
        console.log("✅ Database loaded from localStorage")
      } else {
        // Create new database from template
        await this.createNewDatabase()
        console.log("🆕 New database created")
      }

      this.isInitialized = true
      this.updateDatabaseInfo()
      this.showDatabaseStatus("✅ Database Connected", "success")
    } catch (error) {
      console.error("❌ Database initialization failed:", error)
      this.showDatabaseStatus("❌ Database Error", "error")
    }
  }

  // 🆕 Create new database structure
  async createNewDatabase() {
    // Load initial data with all flans starting at 0 likes
    this.database = {
      classic: [
        { id: 1, likes: 0, type: "Classic Vanilla Flan", trending: false, lastLiked: null },
        { id: 2, likes: 0, type: "Traditional Caramel Flan", trending: false, lastLiked: null },
        { id: 3, likes: 0, type: "Homemade Flan", trending: false, lastLiked: null },
        { id: 4, likes: 0, type: "Grandma's Recipe", trending: false, lastLiked: null },
        { id: 5, likes: 0, type: "Perfect Flan", trending: false, lastLiked: null },
        { id: 6, likes: 0, type: "Classic Dessert", trending: false, lastLiked: null },
        { id: 7, likes: 0, type: "Sweet Flan", trending: false, lastLiked: null },
        { id: 8, likes: 0, type: "Delicious Flan", trending: false, lastLiked: null },
        { id: 9, likes: 0, type: "Creamy Vanilla Flan", trending: false, lastLiked: null },
        { id: 10, likes: 0, type: "Golden Caramel Flan", trending: false, lastLiked: null },
        { id: 11, likes: 0, type: "Silky Smooth Flan", trending: false, lastLiked: null },
        { id: 12, likes: 0, type: "Traditional Spanish Flan", trending: false, lastLiked: null },
        { id: 13, likes: 0, type: "Rich Custard Flan", trending: false, lastLiked: null },
        { id: 14, likes: 0, type: "Elegant Flan", trending: false, lastLiked: null },
        { id: 15, likes: 0, type: "Heavenly Flan", trending: false, lastLiked: null },
        { id: 16, likes: 0, type: "Perfect Texture Flan", trending: false, lastLiked: null },
        { id: 17, likes: 0, type: "Authentic Flan", trending: false, lastLiked: null },
        { id: 18, likes: 0, type: "Gourmet Flan", trending: false, lastLiked: null },
        { id: 19, likes: 0, type: "Artisan Flan", trending: false, lastLiked: null },
        { id: 20, likes: 0, type: "Premium Classic Flan", trending: false, lastLiked: null },
      ],
      gore: [
        { id: 21, likes: 0, type: "Extreme Flan", trending: false, lastLiked: null },
        { id: 22, likes: 0, type: "Brutal Flan", trending: false, lastLiked: null },
        { id: 23, likes: 0, type: "Intense Flan", trending: false, lastLiked: null },
        { id: 24, likes: 0, type: "Hardcore Flan", trending: false, lastLiked: null },
        { id: 25, likes: 0, type: "Wild Flan", trending: false, lastLiked: null },
        { id: 26, likes: 0, type: "Savage Flan", trending: false, lastLiked: null },
        { id: 27, likes: 0, type: "Extreme Dessert", trending: false, lastLiked: null },
        { id: 28, likes: 0, type: "Gore Flan", trending: false, lastLiked: null },
        { id: 29, likes: 0, type: "Chaotic Flan", trending: false, lastLiked: null },
        { id: 30, likes: 0, type: "Disturbing Flan", trending: false, lastLiked: null },
        { id: 31, likes: 0, type: "Twisted Flan", trending: false, lastLiked: null },
        { id: 32, likes: 0, type: "Nightmare Flan", trending: false, lastLiked: null },
        { id: 33, likes: 0, type: "Horrific Flan", trending: false, lastLiked: null },
        { id: 34, likes: 0, type: "Violent Flan", trending: false, lastLiked: null },
        { id: 35, likes: 0, type: "Aggressive Flan", trending: false, lastLiked: null },
        { id: 36, likes: 0, type: "Destructive Flan", trending: false, lastLiked: null },
        { id: 37, likes: 0, type: "Menacing Flan", trending: false, lastLiked: null },
        { id: 38, likes: 0, type: "Sinister Flan", trending: false, lastLiked: null },
        { id: 39, likes: 0, type: "Malevolent Flan", trending: false, lastLiked: null },
        { id: 40, likes: 0, type: "Apocalyptic Flan", trending: false, lastLiked: null },
      ],
      ai: [
        { id: 41, likes: 0, type: "AI Generated Flan", trending: false, lastLiked: null },
        { id: 42, likes: 0, type: "Neural Network Flan", trending: false, lastLiked: null },
        { id: 43, likes: 0, type: "Machine Learning Flan", trending: false, lastLiked: null },
        { id: 44, likes: 0, type: "Digital Flan", trending: false, lastLiked: null },
        { id: 45, likes: 0, type: "Synthetic Flan", trending: false, lastLiked: null },
        { id: 46, likes: 0, type: "Algorithm Flan", trending: false, lastLiked: null },
        { id: 47, likes: 0, type: "Virtual Flan", trending: false, lastLiked: null },
        { id: 48, likes: 0, type: "Tech Flan", trending: false, lastLiked: null },
        { id: 49, likes: 0, type: "Cybernetic Flan", trending: false, lastLiked: null },
        { id: 50, likes: 0, type: "Robotic Flan", trending: false, lastLiked: null },
        { id: 51, likes: 0, type: "Quantum Flan", trending: false, lastLiked: null },
        { id: 52, likes: 0, type: "Holographic Flan", trending: false, lastLiked: null },
        { id: 53, likes: 0, type: "Binary Flan", trending: false, lastLiked: null },
        { id: 54, likes: 0, type: "Pixel Perfect Flan", trending: false, lastLiked: null },
        { id: 55, likes: 0, type: "Algorithmic Flan", trending: false, lastLiked: null },
        { id: 56, likes: 0, type: "Deep Learning Flan", trending: false, lastLiked: null },
        { id: 57, likes: 0, type: "Computational Flan", trending: false, lastLiked: null },
        { id: 58, likes: 0, type: "Futuristic Flan", trending: false, lastLiked: null },
        { id: 59, likes: 0, type: "Automated Flan", trending: false, lastLiked: null },
        { id: 60, likes: 0, type: "Next-Gen Flan", trending: false, lastLiked: null },
      ],
      brainrot: [
        { id: 61, likes: 0, type: "Brainrot Flan", trending: false, lastLiked: null },
        { id: 62, likes: 0, type: "Chaotic Flan", trending: false, lastLiked: null },
        { id: 63, likes: 0, type: "Cursed Flan", trending: false, lastLiked: null },
        { id: 64, likes: 0, type: "Weird Flan", trending: false, lastLiked: null },
        { id: 65, likes: 0, type: "Strange Flan", trending: false, lastLiked: null },
        { id: 66, likes: 0, type: "Bizarre Flan", trending: false, lastLiked: null },
        { id: 67, likes: 0, type: "Surreal Flan", trending: false, lastLiked: null },
        { id: 68, likes: 0, type: "Abstract Flan", trending: false, lastLiked: null },
        { id: 69, likes: 0, type: "Psychedelic Flan", trending: false, lastLiked: null },
        { id: 70, likes: 0, type: "Trippy Flan", trending: false, lastLiked: null },
        { id: 71, likes: 0, type: "Mind-bending Flan", trending: false, lastLiked: null },
        { id: 72, likes: 0, type: "Reality-breaking Flan", trending: false, lastLiked: null },
        { id: 73, likes: 0, type: "Existential Flan", trending: false, lastLiked: null },
        { id: 74, likes: 0, type: "Consciousness Flan", trending: false, lastLiked: null },
        { id: 75, likes: 0, type: "Dimensional Flan", trending: false, lastLiked: null },
        { id: 76, likes: 0, type: "Cosmic Flan", trending: false, lastLiked: null },
        { id: 77, likes: 0, type: "Transcendent Flan", trending: false, lastLiked: null },
        { id: 78, likes: 0, type: "Enlightened Flan", trending: false, lastLiked: null },
        { id: 79, likes: 0, type: "Mystical Flan", trending: false, lastLiked: null },
        { id: 80, likes: 0, type: "Ultimate Brainrot Flan", trending: false, lastLiked: null },
      ],
    }

    this.metadata = {
      version: "1.0.0",
      created: new Date().toISOString(),
      lastUpdate: new Date().toISOString(),
      totalFlans: 80,
      totalLikes: 0, // Start with 0 total likes
      totalUsers: 1,
      backupCount: 0,
    }

    this.users = {}
    this.activity = []
    this.backups = []

    // Save initial database
    await this.saveDatabase()
  }

  // 💾 Save database to JSON (simulated file system)
  async saveDatabase() {
    try {
      this.operationCount++

      // Update metadata
      this.metadata.lastUpdate = new Date().toISOString()
      this.metadata.totalLikes = this.calculateTotalLikes()

      // Create complete database structure
      const completeDatabase = {
        metadata: this.metadata,
        flans: this.database,
        users: this.users || {},
        activity: this.activity || [],
        backups: this.backups || [],
      }

      // Save to localStorage (simulating JSON file)
      localStorage.setItem(this.dbKey, JSON.stringify(this.database))
      localStorage.setItem(this.metadataKey, JSON.stringify(this.metadata))
      localStorage.setItem("onlyflans-complete-db", JSON.stringify(completeDatabase))

      // Update UI
      this.updateDatabaseInfo()
      this.showDatabaseStatus("💾 Database Saved", "success")

      // Trigger storage event for cross-tab sync
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: this.dbKey,
          newValue: JSON.stringify(this.database),
        }),
      )

      // Enhanced synchronization trigger
      window.dispatchEvent(
        new CustomEvent("databaseUpdated", {
          detail: {
            timestamp: new Date().toISOString(),
            totalLikes: this.metadata.totalLikes,
            operationCount: this.operationCount,
          },
        }),
      )

      console.log(`✅ Database saved successfully (Operation #${this.operationCount})`)
      return true
    } catch (error) {
      console.error("❌ Database save failed:", error)
      this.showDatabaseStatus("❌ Save Failed", "error")
      return false
    }
  }

  // 📊 Calculate total likes across all flans
  calculateTotalLikes() {
    return Object.values(this.database)
      .flat()
      .reduce((sum, flan) => sum + flan.likes, 0)
  }

  // ❤️ Update flan likes in database
  async updateFlanLikes(flanId, newLikes, userId = null) {
    try {
      const allFlans = Object.values(this.database).flat()
      const flan = allFlans.find((f) => f.id === flanId)

      if (flan) {
        const oldLikes = flan.likes
        flan.likes = Math.max(0, newLikes)
        flan.lastLiked = new Date().toISOString()

        // Log activity
        this.logActivity("like", flanId, flan.type, userId, oldLikes, newLikes)

        // Update trending status
        this.updateTrendingStatus(flan)

        // Save database
        await this.saveDatabase()

        console.log(`❤️ Flan ${flanId} likes updated: ${oldLikes} → ${newLikes}`)
        return true
      }

      return false
    } catch (error) {
      console.error("❌ Failed to update flan likes:", error)
      return false
    }
  }

  // 📈 Update trending status based on likes
  updateTrendingStatus(flan) {
    const trendingThresholds = {
      classic: 10, // Reduced from 250 to 10
      gore: 5, // Reduced from 150 to 5
      ai: 15, // Reduced from 300 to 15
      brainrot: 20, // Reduced from 400 to 20
    }

    const section = Object.keys(this.database).find((s) => this.database[s].some((f) => f.id === flan.id))

    if (section) {
      flan.trending = flan.likes >= trendingThresholds[section]
    }
  }

  // 📝 Log activity to database
  logActivity(type, flanId, flanName, userId, oldValue, newValue) {
    const activity = {
      id: Date.now(),
      type,
      flanId,
      flanName,
      userId,
      oldValue,
      newValue,
      timestamp: new Date().toISOString(),
    }

    this.activity = this.activity || []
    this.activity.unshift(activity)

    // Keep only last 100 activities
    if (this.activity.length > 100) {
      this.activity = this.activity.slice(0, 100)
    }
  }

  // 🔄 Create database backup
  async createBackup() {
    try {
      const backup = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        database: JSON.parse(JSON.stringify(this.database)),
        metadata: JSON.parse(JSON.stringify(this.metadata)),
      }

      this.backups = this.backups || []
      this.backups.unshift(backup)

      // Keep only last 5 backups
      if (this.backups.length > 5) {
        this.backups = this.backups.slice(0, 5)
      }

      this.metadata.backupCount = this.backups.length
      await this.saveDatabase()

      this.showDatabaseStatus("💾 Backup Created", "success")
      console.log("✅ Database backup created")
      return true
    } catch (error) {
      console.error("❌ Backup creation failed:", error)
      this.showDatabaseStatus("❌ Backup Failed", "error")
      return false
    }
  }

  // 📥 Export database as downloadable JSON file
  exportDatabase() {
    try {
      const completeDatabase = {
        metadata: this.metadata,
        flans: this.database,
        users: this.users || {},
        activity: this.activity || [],
        backups: this.backups || [],
      }

      const dataStr = JSON.stringify(completeDatabase, null, 2)
      const dataBlob = new Blob([dataStr], { type: "application/json" })

      const link = document.createElement("a")
      link.href = URL.createObjectURL(dataBlob)
      link.download = `onlyflans-database-${new Date().toISOString().split("T")[0]}.json`
      link.click()

      this.showDatabaseStatus("📥 Database Exported", "success")
      console.log("✅ Database exported successfully")
      return true
    } catch (error) {
      console.error("❌ Database export failed:", error)
      this.showDatabaseStatus("❌ Export Failed", "error")
      return false
    }
  }

  // 📤 Import database from JSON file
  async importDatabase(file) {
    try {
      const text = await file.text()
      const importedData = JSON.parse(text)

      // Validate imported data structure
      if (importedData.flans && importedData.metadata) {
        this.database = importedData.flans
        this.metadata = importedData.metadata
        this.users = importedData.users || {}
        this.activity = importedData.activity || []
        this.backups = importedData.backups || []

        await this.saveDatabase()
        this.updateDatabaseInfo()

        this.showDatabaseStatus("📤 Database Imported", "success")
        console.log("✅ Database imported successfully")

        // Trigger UI update
        window.dispatchEvent(new CustomEvent("databaseImported"))
        return true
      } else {
        throw new Error("Invalid database format")
      }
    } catch (error) {
      console.error("❌ Database import failed:", error)
      this.showDatabaseStatus("❌ Import Failed", "error")
      return false
    }
  }

  // 📊 Update database info display
  updateDatabaseInfo() {
    const lastUpdateEl = document.getElementById("lastUpdate")
    const dbSizeEl = document.getElementById("dbSize")
    const backupCountEl = document.getElementById("backupCount")
    const dbOperationsEl = document.getElementById("dbOperations")

    if (lastUpdateEl) {
      const lastUpdate = new Date(this.metadata.lastUpdate)
      lastUpdateEl.textContent = lastUpdate.toLocaleString()
    }

    if (dbSizeEl) {
      const dbString = JSON.stringify({
        metadata: this.metadata,
        flans: this.database,
        users: this.users,
        activity: this.activity,
      })
      const sizeKB = Math.round(new Blob([dbString]).size / 1024)
      dbSizeEl.textContent = `${sizeKB} KB`
    }

    if (backupCountEl) {
      backupCountEl.textContent = this.metadata.backupCount || 0
    }

    if (dbOperationsEl) {
      dbOperationsEl.textContent = this.operationCount
    }
  }

  // 🔔 Show database status notification
  showDatabaseStatus(message, type = "info") {
    const dbStatus = document.getElementById("dbStatus")
    if (!dbStatus) return

    const dot = dbStatus.querySelector(".db-dot")
    const text = dbStatus.querySelector("span:last-child")

    // Update status
    text.textContent = message

    // Update colors based on type
    switch (type) {
      case "success":
        dot.style.background = "#10b981"
        dbStatus.style.background = "linear-gradient(135deg, #10b981 0%, #059669 100%)"
        break
      case "error":
        dot.style.background = "#ef4444"
        dbStatus.style.background = "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
        break
      case "warning":
        dot.style.background = "#f59e0b"
        dbStatus.style.background = "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
        break
      case "sync":
        dot.style.background = "#3b82f6"
        dbStatus.style.background = "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
        break
      default:
        dot.style.background = "#3b82f6"
        dbStatus.style.background = "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
    }

    // Reset after 3 seconds
    setTimeout(() => {
      text.textContent = "JSON Database"
      dot.style.background = "#10b981"
      dbStatus.style.background = "linear-gradient(135deg, #10b981 0%, #059669 100%)"
    }, 3000)
  }

  // 🔍 Get flan by ID
  getFlanById(flanId) {
    return Object.values(this.database)
      .flat()
      .find((f) => f.id === flanId)
  }

  // 📈 Get database statistics
  getStats() {
    return {
      totalFlans: Object.values(this.database).flat().length,
      totalLikes: this.calculateTotalLikes(),
      operationCount: this.operationCount,
      lastUpdate: this.metadata.lastUpdate,
      backupCount: this.metadata.backupCount || 0,
    }
  }
}

// 🌐 Global database instance
window.dbManager = new DatabaseManager()
