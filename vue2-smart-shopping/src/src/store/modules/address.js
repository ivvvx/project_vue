import { getAddress } from '@/api/address'
import { getAddressList, setAddressList } from '@/utils/storage'
export default {
  namespaced: true,
  state () {
    return {
      addressList: getAddressList()
    }
  },
  mutations: {
    saveAddress (state, address) {
      state.addressList = address
      setAddressList(address)
    }
  },
  actions: {
    async getAddressAs (context) {
      if (context.state.addressList.length > 0) {
        return
      }
      const { data: { list } } = await getAddress()
      list.forEach((item) => {
        item.isSelect = false
      })

      context.commit('saveAddress', list)
    }
  },
  getters: {}
}
