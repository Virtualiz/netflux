import {WebChannelManagerInterface} from './webChannelManager'

/**
 * Fully connected web channel manager. Implements fully connected topology
 * network, when each peer is connected to each other.
 *
 * @extends module:webChannelManager~Interface
 */
class FullyConnectedService extends WebChannelManagerInterface {

  constructor () {
    super()
  }

  add (channel) {
    let wc = channel.webChannel
    let peerIds = new Set([wc.myId])
    let jpIds = new Set()
    wc.channels.forEach((c) => peerIds.add(c.peerId))
    wc.getJoiningPeers().forEach((jp) => {
      if (channel.peerId !== jp.id && !peerIds.has(jp.id)) {
        jpIds.add(jp.id)
      }
    })
    return this.connectWith(wc, channel.peerId, channel.peerId, [...peerIds], [...jpIds])
  }

  broadcast (webChannel, data) {
    for (let c of webChannel.channels) {
      c.send(data)
    }
  }

  sendTo (id, webChannel, data) {
    for (let c of webChannel.channels) {
      if (c.peerId === id) {
        c.send(data)
        return
      }
    }
  }

  leave (webChannel) {}
}

export default FullyConnectedService
