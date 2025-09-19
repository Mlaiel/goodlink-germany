import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'

export interface InventoryItem {
  sku: string
  quantity: number
  marketplace: string
  lastSynced: string
  status: 'synced' | 'pending' | 'error' | 'syncing'
  error?: string
}

interface SyncStats {
  totalSynced: number
  errors: number
  pending: number
}

export function useInventorySync() {
  const [inventory, setInventory] = useKV<InventoryItem[]>('inventory-items', [])
  const [isConnected, setIsConnected] = useState(false)
  const [lastSyncTime, setLastSyncTime] = useKV<string>('last-sync-time', '')
  const [syncStats, setSyncStats] = useKV<SyncStats>('sync-stats', {
    totalSynced: 0,
    errors: 0,
    pending: 0
  })

  // Simulate real-time updates
  useEffect(() => {
    // Initialize with sample data if empty
    if (!inventory || inventory.length === 0) {
      const sampleInventory: InventoryItem[] = [
        { sku: 'GL-001', marketplace: 'Amazon', quantity: 45, lastSynced: new Date().toISOString(), status: 'synced' },
        { sku: 'GL-001', marketplace: 'eBay', quantity: 23, lastSynced: new Date().toISOString(), status: 'synced' },
        { sku: 'GL-002', marketplace: 'Amazon', quantity: 67, lastSynced: new Date().toISOString(), status: 'synced' },
        { sku: 'GL-002', marketplace: 'OTTO', quantity: 34, lastSynced: new Date().toISOString(), status: 'error', error: 'API rate limit' },
        { sku: 'GL-003', marketplace: 'bol.com', quantity: 12, lastSynced: new Date().toISOString(), status: 'synced' },
        { sku: 'GL-003', marketplace: 'Amazon', quantity: 89, lastSynced: new Date().toISOString(), status: 'syncing' },
      ]
      setInventory(sampleInventory)
    }

    setIsConnected(true)

    // Simulate periodic inventory updates
    const interval = setInterval(() => {
      simulateInventoryUpdate()
    }, 8000) // Every 8 seconds

    return () => clearInterval(interval)
  }, [])

  const simulateInventoryUpdate = () => {
    const marketplaces = ['Amazon', 'eBay', 'OTTO', 'Kaufland', 'bol.com']
    const skus = ['GL-001', 'GL-002', 'GL-003', 'GL-004', 'GL-005']
    
    const randomSku = skus[Math.floor(Math.random() * skus.length)]
    const randomMarketplace = marketplaces[Math.floor(Math.random() * marketplaces.length)]
    const quantityChange = Math.floor(Math.random() * 10) - 5 // -5 to +5
    
    updateInventory(randomSku, randomMarketplace, quantityChange)
  }

  const updateInventory = (sku: string, marketplace: string, quantityChange: number) => {
    setInventory((currentInventory) => {
      const currentItems = currentInventory || []
      const existingIndex = currentItems.findIndex(
        item => item.sku === sku && item.marketplace === marketplace
      )
      
      const newInventory = [...currentItems]
      const timestamp = new Date().toISOString()
      
      if (existingIndex >= 0) {
        const existing = newInventory[existingIndex]
        newInventory[existingIndex] = {
          ...existing,
          quantity: Math.max(0, existing.quantity + quantityChange),
          lastSynced: timestamp,
          status: 'synced'
        }
      } else {
        newInventory.push({
          sku,
          marketplace,
          quantity: Math.max(0, 50 + quantityChange),
          lastSynced: timestamp,
          status: 'synced'
        })
      }
      
      return newInventory
    })

    // Update sync stats
    setSyncStats((current) => {
      const currentStats = current || { totalSynced: 0, errors: 0, pending: 0 }
      return {
        ...currentStats,
        totalSynced: currentStats.totalSynced + 1
      }
    })

    setLastSyncTime(new Date().toISOString())
    
    // Show toast notification for significant changes
    if (Math.abs(quantityChange) > 3) {
      toast.success(`Inventory synced: ${sku} on ${marketplace}`, {
        description: `Quantity ${quantityChange > 0 ? 'increased' : 'decreased'} by ${Math.abs(quantityChange)}`
      })
    }
  }

  const manualSync = async (marketplace?: string) => {
    const currentInventory = inventory || []
    const targetItems = marketplace 
      ? currentInventory.filter(item => item.marketplace === marketplace)
      : currentInventory

    // Set items to syncing status
    setInventory((current) => {
      const currentItems = current || []
      return currentItems.map(item => 
        (!marketplace || item.marketplace === marketplace)
          ? { ...item, status: 'syncing' as const }
          : item
      )
    })

    toast.info(`Syncing inventory ${marketplace ? `for ${marketplace}` : 'across all marketplaces'}...`)

    // Simulate API calls with delays
    for (const item of targetItems) {
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000))
      
      // Simulate occasional errors
      const hasError = Math.random() < 0.1
      
      setInventory((current) => {
        const currentItems = current || []
        return currentItems.map(invItem => 
          invItem.sku === item.sku && invItem.marketplace === item.marketplace
            ? {
                ...invItem,
                status: hasError ? 'error' as const : 'synced' as const,
                error: hasError ? 'Connection timeout' : undefined,
                lastSynced: new Date().toISOString()
              }
            : invItem
        )
      })

      if (hasError) {
        setSyncStats((current) => {
          const currentStats = current || { totalSynced: 0, errors: 0, pending: 0 }
          return {
            ...currentStats,
            errors: currentStats.errors + 1
          }
        })
      } else {
        setSyncStats((current) => {
          const currentStats = current || { totalSynced: 0, errors: 0, pending: 0 }
          return {
            ...currentStats,
            totalSynced: currentStats.totalSynced + 1
          }
        })
      }
    }

    setLastSyncTime(new Date().toISOString())
    toast.success('Inventory sync completed')
  }

  const retryFailedSync = async (sku: string, marketplace: string) => {
    setInventory((current) => {
      const currentItems = current || []
      return currentItems.map(item => 
        item.sku === sku && item.marketplace === marketplace
          ? { ...item, status: 'syncing' as const, error: undefined }
          : item
      )
    })

    // Simulate retry
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const success = Math.random() > 0.3 // 70% success rate
    
    setInventory((current) => {
      const currentItems = current || []
      return currentItems.map(item => 
        item.sku === sku && item.marketplace === marketplace
          ? {
              ...item,
              status: success ? 'synced' as const : 'error' as const,
              error: success ? undefined : 'Retry failed',
              lastSynced: new Date().toISOString()
            }
          : item
      )
    })

    if (success) {
      toast.success(`Retry successful for ${sku} on ${marketplace}`)
      setSyncStats((current) => {
        const currentStats = current || { totalSynced: 0, errors: 0, pending: 0 }
        return {
          ...currentStats,
          totalSynced: currentStats.totalSynced + 1
        }
      })
    } else {
      toast.error(`Retry failed for ${sku} on ${marketplace}`)
      setSyncStats((current) => {
        const currentStats = current || { totalSynced: 0, errors: 0, pending: 0 }
        return {
          ...currentStats,
          errors: currentStats.errors + 1
        }
      })
    }
  }

  return {
    inventory: inventory || [],
    isConnected,
    lastSyncTime: lastSyncTime || '',
    syncStats: syncStats || { totalSynced: 0, errors: 0, pending: 0 },
    manualSync,
    retryFailedSync,
    updateInventory
  }
}