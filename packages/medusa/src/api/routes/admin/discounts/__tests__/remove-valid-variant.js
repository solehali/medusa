import { IdMap } from "medusa-test-utils"
import { request } from "../../../../../helpers/test-request"
import { DiscountServiceMock } from "../../../../../services/__mocks__/discount"

describe("DELETE /admin/discounts/:discount_id/variants/:variant_id", () => {
  describe("successful addition", () => {
    let subject

    beforeAll(async () => {
      subject = await request(
        "DELETE",
        `/admin/discounts/${IdMap.getId("total10")}/variants/${IdMap.getId(
          "testVariant"
        )}`,
        {
          adminSession: {
            jwt: {
              userId: IdMap.getId("admin_user"),
            },
          },
        }
      )
    })

    it("returns 200", () => {
      expect(subject.status).toEqual(200)
    })

    it("calls service retrieve", () => {
      expect(DiscountServiceMock.retrieve).toHaveBeenCalledTimes(1)
      expect(DiscountServiceMock.retrieve).toHaveBeenCalledWith(
        IdMap.getId("total10")
      )

      expect(DiscountServiceMock.removeValidVariant).toHaveBeenCalledTimes(1)
      expect(DiscountServiceMock.removeValidVariant).toHaveBeenCalledWith(
        IdMap.getId("total10"),
        IdMap.getId("testVariant")
      )
    })
  })
})