const { sumTokens, call } = require('../helper/chain/waves')

module.exports = {
  timetravel: false,
  methodology: `Counts the tokens locked in the contracts to be used as collateral to borrow or to earn yield. Borrowed coins are not counted towards the TVL, so only the coins actually locked in the contracts are counted. There's multiple reasons behind this but one of the main ones is to avoid inflating the TVL through cycled lending`,
  waves: {
    tvl, borrowed,
  },
  hallmarks: [
    [1659092400, "Bad debt settlement in USDN"],
  ],
}
const aTokens = [
  // v2 pepe
  '3PMYady7KzUNnRrFGzMBnq7akMDWiCQyoQz',
  '3PHxubMUtynEY2AeHq3K1kUizRPN9HUC2rt',
  '3PByijo1xaCSYNKnQb98U7YMPwp5tNF84JQ',
  '3PLLikQB5JEREMhjQMD1ZX7HkYZJMRW6J1q',
  '3P5ggc5ssBHp1Dr7HwGLYf8SQimta99q5QT',

  // v1
  "3PCwFXSq8vj8iKitA5zrrLRbuqehfmimpce",
  "3PEiD1zJWTMZNWSCyzhvBw9pxxAWeEwaghR",
  "3P8G747fnB1DTQ4d5uD114vjAaeezCW4FaM",
  "3PA7QMFyHMtHeP66SUQnwCgwKQHKpCyXWwd",
  "3PPdeWwrzaxqgr6BuReoF3sWfxW8SYv743D",
  "3PGCkrHBxFMi7tz1xqnxgBpeNvn5E4M4g8S",
  "3PBjqiMwwag72VWUtHNnVrxTBrNK8D7bVcN",
  "3PGzUA7Yp2RFobH9mPFYsZC1wkwWHNsP14q",
  "3PNKc29PsUULxcHexjcZu7cMBqAAEYNfXnH",
  "3PBEwUv36ZXRiDEaVmXR41sPvbGfm3nyC6k",
  "3PN1LXdwuFWH3paF3fpMNCWk7oWRzXCeMSC"

]

async function tvl(_, _b, _cb, { api, }) {
  return sumTokens({
    owners: aTokens, api, includeWaves: true,
  })
}

async function borrowed(_, _b, _cb, { api, }) {
  await Promise.all(aTokens.map(async (token) => {
    const assetId = (await call({ target: token, key: 'assetId'})).split('_')[0]
    const res = (await call({ target: token, key: 'reserveGlobalData'})).split('|')[2]
    api.add(assetId, res)
  }))
}