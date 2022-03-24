import logging
import coloredlogs
import sys


def setup_logging():
    # setting up logging configuration
    coloredlogs.install(milliseconds=True)
    coloredlogs.install(
        fmt="%(asctime)s,%(msecs)03d %(hostname)s %(name)s[%(process)d] | %(levelname)s | %(message)s"
    )

    loghandler = logging.StreamHandler(sys.stdout)
    formatter = logging.Formatter("%(asctime)s | %(levelname)s | %(message)s")
    loghandler.setFormatter(formatter)
    logging.basicConfig(level=logging.DEBUG, handlers=[loghandler])
    logging.info("Starting to log things..")
