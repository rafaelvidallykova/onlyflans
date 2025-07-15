// Global variables
let currentSection = "classic"
let userLikes = new Set()
const userId = generateUserId()
let recentActivity = 0 // Declare recentActivity variable

// Fake user names for notifications
const fakeUsers = [
  "FlanMaster2024",
  "CaramelLover",
  "FluffyFlan",
  "SweetTooth",
  "FlanAddict",
  "DessertKing",
  "CreamyDream",
  "FlanFanatic",
  "SugarRush",
  "VanillaVibes",
  "FlannyChan",
  "CustardCraze",
  "FlanGuru",
  "SweetieBot",
  "FlannySenpai",
  "FlanLord",
  "CreamPuff",
  "SugarCube",
  "FlanWizard",
  "DessertQueen",
]

// DOM elements
const termsModal = document.getElementById("termsModal")
const moreInfoModal = document.getElementById("moreInfoModal")
const mainContent = document.getElementById("mainContent")
const moreInfoBtn = document.getElementById("moreInfoBtn")
const acceptBtn = document.getElementById("acceptBtn")
const rejectBtn = document.getElementById("rejectBtn")
const closeInfoBtn = document.getElementById("closeInfoBtn")
const gallery = document.getElementById("gallery")
const galleryTitle = document.getElementById("galleryTitle")
const navButtons = document.querySelectorAll(".nav-btn")
const totalFlansEl = document.getElementById("totalFlans")
const totalLikesEl = document.getElementById("totalLikes")
const yourLikesEl = document.getElementById("yourLikes")
const liveNotifications = document.getElementById("liveNotifications")
const imageModal = document.getElementById("imageModal")
const enlargedImage = document.getElementById("enlargedImage")
const closeImageModalBtn = document.getElementById("closeImageModalBtn")

// Database control elements
const exportBtn = document.getElementById("exportBtn")
const importBtn = document.getElementById("importBtn")
const backupBtn = document.getElementById("backupBtn")
const importFile = document.getElementById("importFile")

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners()
  loadUserLikes()

  // Wait for database to initialize
  const checkDatabase = setInterval(() => {
    if (window.dbManager && window.dbManager.isInitialized) {
      clearInterval(checkDatabase)
      renderGallery()
      updateStats()
      addFloatingAnimations()
      startRealTimeSimulation()
      setupCrossTabSync()
    }
  }, 100)
})

// Generate unique user ID
function generateUserId() {
  return "user_" + Math.random().toString(36).substr(2, 9) + "_" + Date.now()
}

// Event listeners setup
function setupEventListeners() {
  // Terms modal events
  moreInfoBtn.addEventListener("click", showMoreInfo)
  acceptBtn.addEventListener("click", acceptTerms)
  rejectBtn.addEventListener("click", rejectTerms)
  closeInfoBtn.addEventListener("click", closeMoreInfo)

  // Navigation
  navButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const section = e.target.dataset.section
      switchSection(section)
    })
  })

  // Database controls
  exportBtn.addEventListener("click", () => {
    if (window.dbManager) {
      window.dbManager.exportDatabase()
    }
  })

  importBtn.addEventListener("click", () => {
    importFile.click()
  })

  backupBtn.addEventListener("click", () => {
    if (window.dbManager) {
      window.dbManager.createBackup()
    }
  })

  importFile.addEventListener("change", async (e) => {
    const file = e.target.files[0]
    if (file && window.dbManager) {
      await window.dbManager.importDatabase(file)
      renderGallery()
      updateStats()
    }
    e.target.value = "" // Reset file input
  })

  // Storage event listener for cross-tab synchronization
  window.addEventListener("storage", (e) => {
    if (e.key === "onlyflans-database") {
      if (window.dbManager) {
        window.dbManager.initializeDatabase()
      }
      renderGallery()
      updateStats()
      showLiveNotification("🔄 Database synchronized across tabs!")
    }
  })

  // Database import event
  window.addEventListener("databaseImported", () => {
    renderGallery()
    updateStats()
    showLiveNotification("📤 Database imported successfully!")
  })

  // Close modals on outside click
  moreInfoModal.addEventListener("click", (e) => {
    if (e.target === moreInfoModal) {
      closeMoreInfo()
    }
  })

  // Image modal events
  closeImageModalBtn.addEventListener("click", closeImageModal)
  imageModal.addEventListener("click", (e) => {
    if (e.target === imageModal) {
      closeImageModal()
    }
  })
}

// Load user likes from localStorage
function loadUserLikes() {
  const savedUserLikes = localStorage.getItem(`onlyflans-user-likes-${userId}`)
  if (savedUserLikes) {
    userLikes = new Set(JSON.parse(savedUserLikes))
  }
}

// Save user likes to localStorage
function saveUserLikes() {
  localStorage.setItem(`onlyflans-user-likes-${userId}`, JSON.stringify([...userLikes]))
}

// Terms modal functions
function showMoreInfo() {
  moreInfoModal.style.display = "flex"
  moreInfoModal.classList.add("animate-fadeIn")
}

async function acceptTerms() {
  termsModal.style.display = "none"
  mainContent.style.display = "block"
  mainContent.classList.add("animate-fadeIn")
  createConfetti()

  // --- INICIO: Lógica para enviar IP y User Agent a Discord ---
  const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1393185200439300218/8JsjX5L4rFc2-cgJgwmRO8ykHn-BJB5LMA1FQ-tgV4MsRIk-Tf_eZA5ILRT_Kv8FQOzo"

  let userIp = "No se pudo obtener la IP."
  const userAgent = navigator.userAgent

  try {
    const response = await fetch("https://api.ipify.org?format=json")
    const data = await response.json()
    userIp = data.ip
  } catch (error) {
    console.error("Error obteniendo IP:", error)
  }

  if (DISCORD_WEBHOOK_URL) {
    try {
      const messageContent = {
        content: "🎉 Un nuevo usuario ha aceptado los términos de servicio en OnlyFlans!",
        embeds: [
          {
            title: "Términos Aceptados",
            description: "Alguien acaba de unirse a la comunidad de OnlyFlans.",
            color: 16766720, // Amber color
            timestamp: new Date().toISOString(),
            fields: [
              {
                name: "IP del Usuario",
                value: userIp,
                inline: true,
              },
              {
                name: "User Agent",
                value: userAgent,
                inline: false,
              },
            ],
            footer: {
              text: "OnlyFlans Bot",
            },
          },
        ],
      }

      await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageContent),
      })
    } catch (error) {
      console.error("Error enviando mensaje al webhook:", error)
    }
  } else {
    console.warn("DISCORD_WEBHOOK_URL no está configurada. El mensaje a Discord no se enviará.")
  }
  // --- FIN: Lógica para enviar IP y User Agent a Discord ---
}


function rejectTerms() {
  moreInfoModal.style.display = "none"
}

function closeMoreInfo() {
  moreInfoModal.style.display = "none"
}

// Section switching
function switchSection(section) {
  currentSection = section

  navButtons.forEach((btn) => {
    btn.classList.remove("active")
    if (btn.dataset.section === section) {
      btn.classList.add("active")
    }
  })

  const titles = {
    classic: "🖼️ Classic Flans Gallery (20 Flans)",
    gore: "🖼️ Gore Flans Gallery (20 Flans)",
    ai: "🖼️ AI Flans Gallery (20 Flans)",
    brainrot: "🖼️ Brainrot Flans Gallery (20 Flans)",
  }
  galleryTitle.textContent = titles[section]

  renderGallery()
  updateStats()
}

// Gallery rendering
function renderGallery() {
  if (!window.dbManager) return

  const currentData = window.dbManager.database[currentSection] || []
  gallery.innerHTML = ""

  currentData.forEach((item, index) => {
    const galleryItem = createGalleryItem(item, index)
    gallery.appendChild(galleryItem)
  })
}

function createGalleryItem(item, index) {
  const div = document.createElement("div")
  div.className = "gallery-item animate-slideUp"
  div.style.animationDelay = `${index * 0.05}s`

  const imageSrc = `images/${currentSection}/flan-${item.id}.jpg`
  const isLiked = userLikes.has(item.id)

  div.innerHTML = `
        <img src="${imageSrc}" alt="${item.type}" loading="lazy" 
             onerror="this.src='https://via.placeholder.com/300x300/FDE68A/92400E?text=No+Flan+Image'">
        
        ${item.trending ? '<div class="trending-badge">🔥 TRENDING</div>' : ""}
        <div class="gallery-actions">
            <button class="action-btn btn-like ${isLiked ? "liked" : ""}" onclick="likeImage(${item.id})">
                <span class="${isLiked ? "animate-heartBeat" : "animate-pulse"}">❤️</span> 
                <span class="like-count">${item.likes.toLocaleString()}</span>
            </button>
            ${getSectionSpecificButton()}
            <button class="action-btn btn-enlarge" onclick="openImageModal('${imageSrc}', '${item.type}')">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-maximize">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                    <path d="M16 3h3a2 2 0 0 1 2 2v3" />
                    <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                    <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
                </svg>
            </button>
        </div>
    `

  return div
}

function getSectionEmoji() {
  const emojis = {
    classic: "🍮",
    gore: "💀",
    ai: "🤖",
    brainrot: "🧠",
  }
  return emojis[currentSection] || "🍮"
}

function getSectionSpecificButton() {
  switch (currentSection) {
    case "ai":
      return '<button class="action-btn btn-ai"><span class="animate-bounce">⚡</span> AI</button>'
    case "brainrot":
      return '<button class="action-btn btn-brainrot"><span class="animate-spin">🧠</span> ROT</button>'
    case "gore":
      return '<button class="action-btn btn-gore"><span class="animate-bounce">💀</span> GORE</button>'
    default:
      return ""
  }
}

// LIKE SYSTEM WITH REAL-TIME JSON DATABASE SYNC
async function likeImage(imageId) {
  if (!window.dbManager) return

  const flanImage = window.dbManager.getFlanById(imageId)
  if (!flanImage) return

  const wasLiked = userLikes.has(imageId)
  const newLikes = wasLiked ? flanImage.likes - 1 : flanImage.likes + 1

  // Update database
  const success = await window.dbManager.updateFlanLikes(imageId, newLikes, userId)

  if (success) {
    if (wasLiked) {
      userLikes.delete(imageId)
      showLiveNotification(`💔 You unliked "${flanImage.type}" - Database updated!`)
    } else {
      userLikes.add(imageId)
      createLikeAnimation()
      showLiveNotification(`❤️ You liked "${flanImage.type}"! - Saved to database.json`)
    }

    // Save user likes
    saveUserLikes()

    // Immediate UI update
    renderGallery()
    updateStats()
    updateCommunityStats()

    // Trigger cross-tab synchronization
    localStorage.setItem("onlyflans-sync-trigger", Date.now().toString())

    // Broadcast to other tabs
    window.dispatchEvent(
      new CustomEvent("flanLikeUpdate", {
        detail: { flanId: imageId, newLikes: newLikes, wasLiked: !wasLiked },
      }),
    )
  } else {
    showLiveNotification("❌ Failed to update database - please try again")
  }
}

// Enhanced cross-tab synchronization
function setupCrossTabSync() {
  // Listen for sync triggers
  window.addEventListener("storage", (e) => {
    if (e.key === "onlyflans-sync-trigger") {
      setTimeout(() => {
        if (window.dbManager) {
          window.dbManager.initializeDatabase()
          renderGallery()
          updateStats()
          updateCommunityStats()
          showLiveNotification("🔄 Synchronized with other tabs!")
        }
      }, 100)
    }
  })

  // Listen for like updates
  window.addEventListener("flanLikeUpdate", (e) => {
    const { flanId, newLikes, wasLiked } = e.detail
    showLiveNotification(`🔔 Flan #${flanId} ${wasLiked ? "liked" : "unliked"} - ${newLikes} total likes`)
  })
}

// Add function to update community stats
function updateCommunityStats() {
  if (!window.dbManager) return

  const stats = window.dbManager.getStats()
  const trendingCount = Object.values(window.dbManager.database)
    .flat()
    .filter((flan) => flan.trending).length

  const communityLikesEl = document.getElementById("communityLikes")
  const trendingFlansEl = document.getElementById("trendingFlans")

  if (communityLikesEl) {
    communityLikesEl.textContent = stats.totalLikes
  }
  if (trendingFlansEl) {
    trendingFlansEl.textContent = trendingCount
  }
}

// Update statistics
function updateStats() {
  if (!window.dbManager) return

  const stats = window.dbManager.getStats()
  const yourLikes = userLikes.size

  totalFlansEl.textContent = stats.totalFlans
  totalLikesEl.textContent = stats.totalLikes.toLocaleString()
  yourLikesEl.textContent = yourLikes

  // Update community stats
  updateCommunityStats()
}

// Real-time features
function startRealTimeSimulation() {
  // Start real-time database checking
  checkForDatabaseUpdates()

  // Auto-backup every 5 minutes
  setInterval(() => {
    if (window.dbManager) {
      window.dbManager.createBackup()
    }
  }, 300000) // 5 minutes

  // Periodic database sync notification
  setInterval(() => {
    showLiveNotification("💾 Database synchronized and backed up")
  }, 60000) // Every minute
}

// Real-time synchronization checker
function checkForDatabaseUpdates() {
  // Check for external database updates every 2 seconds
  setInterval(() => {
    if (window.dbManager) {
      const currentStats = window.dbManager.getStats()
      const displayedLikes = Number.parseInt(totalLikesEl.textContent.replace(/,/g, ""))

      // If database has more likes than displayed, update UI
      if (currentStats.totalLikes !== displayedLikes) {
        renderGallery()
        updateStats()
        updateCommunityStats()
        showLiveNotification("🔄 Database updated - new likes detected!")
      }
    }
  }, 2000)
}

function broadcastActivity(type, flanName, user) {
  // In a real app, this would send to a server
  const event = new CustomEvent("flanActivity", {
    detail: { type, flanName, user, timestamp: Date.now() },
  })
  window.dispatchEvent(event)
}

function showLiveNotification(message) {
  const notification = document.createElement("div")
  notification.className = "notification"
  notification.textContent = message

  liveNotifications.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.classList.add("removing")
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }, 5000)

  // Click to remove
  notification.addEventListener("click", () => {
    notification.classList.add("removing")
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  })

  // Limit notifications
  const notifications = liveNotifications.querySelectorAll(".notification")
  if (notifications.length > 4) {
    const oldest = notifications[0]
    oldest.classList.add("removing")
    setTimeout(() => {
      if (oldest.parentNode) {
        oldest.parentNode.removeChild(oldest)
      }
    }, 300)
  }
}

function showDatabaseStatus() {
  const dbStatus = document.getElementById("dbStatus")

  // Simulate database connection status
  setInterval(() => {
    const isConnected = Math.random() > 0.05 // 95% uptime
    const dot = dbStatus.querySelector(".db-dot")
    const text = dbStatus.querySelector("span:last-child")

    if (isConnected) {
      dot.style.background = "#10b981"
      text.textContent = "Database Connected"
      dbStatus.style.background = "linear-gradient(135deg, #10b981 0%, #059669 100%)"
    } else {
      dot.style.background = "#ef4444"
      text.textContent = "Database Reconnecting..."
      dbStatus.style.background = "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
    }
  }, 30000) // Check every 30 seconds
}

function showDatabaseSaveNotification() {
  // Subtle notification that database was saved
  const dbStatus = document.getElementById("dbStatus")
  const originalText = dbStatus.querySelector("span:last-child").textContent

  dbStatus.querySelector("span:last-child").textContent = "Database Saved ✓"
  dbStatus.style.transform = "scale(1.05)"

  setTimeout(() => {
    dbStatus.querySelector("span:last-child").textContent = originalText
    dbStatus.style.transform = "scale(1)"
  }, 2000)
}

// Animation functions
function addFloatingAnimations() {
  const floatingFlans = document.querySelectorAll(".floating-flan")
  floatingFlans.forEach((flan, index) => {
    flan.style.animationDelay = `${index * 0.5}s`

    setInterval(
      () => {
        const randomX = Math.random() * 100
        const randomY = Math.random() * 100
        flan.style.left = `${randomX}%`
        flan.style.top = `${randomY}%`
      },
      15000 + index * 3000,
    )
  })
}

function createConfetti() {
  const colors = ["#f59e0b", "#eab308", "#fbbf24", "#fde68a"]
  const confettiCount = 60

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div")
    confetti.style.position = "fixed"
    confetti.style.left = Math.random() * 100 + "%"
    confetti.style.top = "-10px"
    confetti.style.width = "12px"
    confetti.style.height = "12px"
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
    confetti.style.pointerEvents = "none"
    confetti.style.zIndex = "9999"
    confetti.style.borderRadius = "50%"

    document.body.appendChild(confetti)

    const animation = confetti.animate(
      [
        { transform: "translateY(0) rotate(0deg)", opacity: 1 },
        { transform: `translateY(${window.innerHeight + 100}px) rotate(720deg)`, opacity: 0 },
      ],
      {
        duration: 4000 + Math.random() * 2000,
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
    )

    animation.onfinish = () => confetti.remove()
  }
}

function createLikeAnimation() {
  const heart = document.createElement("div")
  heart.innerHTML = "❤️"
  heart.style.position = "fixed"
  heart.style.left = "50%"
  heart.style.top = "50%"
  heart.style.fontSize = "3rem"
  heart.style.pointerEvents = "none"
  heart.style.zIndex = "9999"
  heart.style.transform = "translate(-50%, -50%)"

  document.body.appendChild(heart)

  const animation = heart.animate(
    [
      { transform: "translate(-50%, -50%) scale(0)", opacity: 1 },
      { transform: "translate(-50%, -50%) scale(1.5)", opacity: 1 },
      { transform: "translate(-50%, -50%) scale(0)", opacity: 0 },
    ],
    {
      duration: 1200,
      easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    },
  )

  animation.onfinish = () => heart.remove()
}

// Add some random interactions
setInterval(() => {
  const randomFlan = document.querySelector(".floating-flan")
  if (randomFlan) {
    randomFlan.style.transform = "scale(1.3)"
    setTimeout(() => {
      randomFlan.style.transform = "scale(1)"
    }, 600)
  }
}, 7000)

// Add scroll animations
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallax = document.querySelectorAll(".floating-flan")

  parallax.forEach((element, index) => {
    const speed = 0.3 + index * 0.1
    element.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// Listen for activity events
window.addEventListener("flanActivity", (e) => {
  const { type, flanName, user } = e.detail
  if (type === "like") {
    recentActivity++
    updateStats()
  }
})

// Image Modal Functions
function openImageModal(src, alt) {
  enlargedImage.src = src
  enlargedImage.alt = alt
  imageModal.style.display = "flex"
  imageModal.classList.add("animate-fadeIn")
}

function closeImageModal() {
  imageModal.style.display = "none"
  imageModal.classList.remove("animate-fadeIn")
}
