// ------------------------------------------------------------------------------------------
// General apiDoc documentation blocks and old history blocks.
// ------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------
// History.
// ------------------------------------------------------------------------------------------
/**
 * @apiDefine hottab This title is visible in version 0.0.1 and 0.0.2
 * @apiVersion 0.0.1
 */


/**
 * @api {get} /prints get printers
 * @apiVersion 0.0.1
 * @apiName GetPrinters
 * @apiGroup Printer
 * @apiPermission staff
 *
 * @apiDescription Printing server
 *
 * @apiSuccess {Array}   printers List Printers.
 *
 * @apiError OrderNotFound  Server die
 */

/**
 * @api {post} /printers Print job
 * @apiVersion 0.0.1
 * @apiName PostPrint
 * @apiGroup Printer
 * @apiPermission staff
 *
 * @apiDescription Define blocks with params that will be used in several functions, so you dont have to rewrite them.
 *
 * @apiSuccess {Array}     printers           Printers list.
 * @apiSuccess {Number}     copies         Quantity paper.
 * @apiSuccess {String}     html          template print.
 * @apiSuccess {Number}     timestamp          time print.
 *
 * @apiError OrderNotFound  Server die
 */
