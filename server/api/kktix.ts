import { parseStringPromise } from 'xml2js'

interface RSSItem {
  title: string[]
  description: string[]
  link: string[]
  pubDate: string[]
  guid: [{ _: string }]
}

export default defineEventHandler(async (event) => {
    try {
      // 使用 KKTIX 的 RSS feed 而不是 JSON API
      const rssData = await $fetch<string>('https://kktix.com/events.rss', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'application/rss+xml, application/xml, text/xml',
          'Accept-Language': 'zh-TW,zh;q=0.9,en;q=0.8',
        },
        timeout: 10000,
        retry: 2
      })
      
      // 解析 XML RSS 為 JSON
      const parsedData = await parseStringPromise(rssData)
      const events = parsedData.rss.channel[0].item.map((item: RSSItem) => ({
        title: item.title[0],
        description: item.description[0],
        link: item.link[0],
        pubDate: item.pubDate[0],
        guid: item.guid[0]._
      }))
      
      console.log('成功取得 KKTIX RSS 資料:', events.length, '個活動')
      return {
        message: '成功從 KKTIX RSS 取得資料',
        events: events
      }
    } catch (error) {
      console.error('KKTIX RSS 錯誤:', error)
      
      // 檢查錯誤類型
      const errorCode = (error as { code?: string }).code
      const statusCode = (error as { status?: number }).status
      
      // 如果是網路錯誤或任何存取問題，返回模擬資料
      if (errorCode === 'ECONNRESET' || 
          errorCode === 'ETIMEDOUT' || 
          statusCode === 403 ||
          statusCode === 404) {
        
        const reason = statusCode === 403 ? 
          'KKTIX 拒絕存取 (403 Forbidden)' : 
          statusCode === 404 ?
          'KKTIX RSS 端點不存在 (404 Not Found)' :
          '網路連接問題'
          
        console.log(`${reason}，返回模擬資料`)
        return {
          message: `KKTIX 暫時無法連接 (${reason})，這是模擬資料`,
          events: [
            {
              title: '技術分享會：Vue 3 與 Nuxt.js 實戰',
              description: '深入了解 Vue 3 的最新特性和 Nuxt.js 在現代網頁開發中的應用',
              link: 'https://example.com/event1',
              pubDate: 'Wed, 20 Dec 2024 10:00:00 GMT',
              guid: 'event-1'
            },
            {
              title: 'JavaScript 進階開發工作坊',
              description: '學習現代 JavaScript 開發技巧，包括 ES6+、模組化和非同步程式設計',
              link: 'https://example.com/event2',
              pubDate: 'Wed, 25 Dec 2024 14:00:00 GMT',
              guid: 'event-2'
            },
            {
              title: 'React 與 Next.js 開發實務',
              description: 'React 生態系統全面介紹，從基礎到進階應用',
              link: 'https://example.com/event3',
              pubDate: 'Mon, 30 Dec 2024 09:00:00 GMT',
              guid: 'event-3'
            }
          ]
        }
      }
      
      const errorMessage = (error as { message?: string }).message || String(error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch KKTIX data: ' + errorMessage
      })
    }
  })